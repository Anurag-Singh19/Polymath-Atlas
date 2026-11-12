export interface DailyStreakState {
  activeDates: string[];
  dailyActions: Record<string, number>;
  longestStreak: number;
  lastActiveDate: string | null;
}

export interface DayActivityCell {
  dateKey: string;
  shortDay: string;
  dayNumber: number;
  isToday: boolean;
  active: boolean;
  actions: number;
}

export interface StreakRankInfo {
  title: string;
  nextMilestone: number;
  accentHex: string;
}

export interface StreakSummary {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  engagedToday: boolean;
  todayActions: number;
  last7Days: DayActivityCell[];
  last28Days: DayActivityCell[];
  rank: StreakRankInfo;
}

const STREAK_STORAGE_KEY = 'polymath_atlas_streak_v1';
const MAX_STORED_DAYS = 365;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateKeyToUtcMs(dateKey: string): number {
  const [y, m, d] = dateKey.split('-').map(Number);
  if (!y || !m || !d) return 0;
  return Date.UTC(y, m - 1, d);
}

function shiftLocalDate(baseDate: Date, deltaDays: number): Date {
  return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + deltaDays);
}

function computeLongestRun(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;
  let longest = 1;
  let run = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prevMs = dateKeyToUtcMs(sortedDates[i - 1]);
    const currMs = dateKeyToUtcMs(sortedDates[i]);
    const diff = Math.round((currMs - prevMs) / ONE_DAY_MS);
    if (diff === 1) {
      run += 1;
      if (run > longest) longest = run;
    } else if (diff > 1) {
      run = 1;
    }
  }
  return longest;
}

function sanitizeStreakState(raw: unknown): DailyStreakState {
  if (!raw || typeof raw !== 'object') {
    return {
      activeDates: [],
      dailyActions: {},
      longestStreak: 0,
      lastActiveDate: null,
    };
  }
  const obj = raw as Record<string, unknown>;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const rawDates = Array.isArray(obj.activeDates) ? obj.activeDates : [];
  const uniqueSorted = Array.from(
    new Set(
      rawDates.filter((d): d is string => typeof d === 'string' && datePattern.test(d))
    )
  )
    .sort()
    .slice(-MAX_STORED_DAYS);

  const cleanActions: Record<string, number> = {};
  if (obj.dailyActions && typeof obj.dailyActions === 'object' && !Array.isArray(obj.dailyActions)) {
    for (const [key, val] of Object.entries(obj.dailyActions)) {
      if (datePattern.test(key) && typeof val === 'number' && Number.isFinite(val) && val > 0) {
        cleanActions[key] = Math.floor(val);
      }
    }
  }

  const computedLongest = computeLongestRun(uniqueSorted);
  const storedLongest =
    typeof obj.longestStreak === 'number' && Number.isFinite(obj.longestStreak)
      ? Math.floor(obj.longestStreak)
      : 0;

  return {
    activeDates: uniqueSorted,
    dailyActions: cleanActions,
    longestStreak: Math.max(computedLongest, storedLongest),
    lastActiveDate: uniqueSorted.length > 0 ? uniqueSorted[uniqueSorted.length - 1] : null,
  };
}

export function loadStreakState(): DailyStreakState {
  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      return sanitizeStreakState(null);
    }
    return sanitizeStreakState(JSON.parse(raw));
  } catch {
    return sanitizeStreakState(null);
  }
}

export function saveStreakState(state: DailyStreakState): void {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function recordDailyEngagement(
  kind: 'visit' | 'study' = 'visit',
  now: Date = new Date()
): DailyStreakState {
  const current = loadStreakState();
  const todayKey = getLocalDateKey(now);

  const dateSet = new Set(current.activeDates);
  dateSet.add(todayKey);
  const sortedDates = Array.from(dateSet).sort().slice(-MAX_STORED_DAYS);

  const nextActions = { ...current.dailyActions };
  const existingToday = nextActions[todayKey] || 0;
  if (kind === 'study') {
    nextActions[todayKey] = existingToday + 1;
  } else if (!nextActions[todayKey]) {
    nextActions[todayKey] = 0;
  }

  // Prune old dailyActions beyond retained window
  const cutoffMs = dateKeyToUtcMs(sortedDates[0] || todayKey);
  for (const key of Object.keys(nextActions)) {
    if (dateKeyToUtcMs(key) < cutoffMs) {
      delete nextActions[key];
    }
  }

  const longest = Math.max(current.longestStreak, computeLongestRun(sortedDates));
  const nextState: DailyStreakState = {
    activeDates: sortedDates,
    dailyActions: nextActions,
    longestStreak: longest,
    lastActiveDate: todayKey,
  };

  saveStreakState(nextState);
  return nextState;
}

export function getStreakRank(streakDays: number): StreakRankInfo {
  if (streakDays >= 30) {
    return { title: 'Eternal Flame', nextMilestone: 60, accentHex: '#38BDF8' };
  }
  if (streakDays >= 14) {
    return { title: 'Polymath Blaze', nextMilestone: 30, accentHex: '#F97316' };
  }
  if (streakDays >= 7) {
    return { title: 'Weekly Torch', nextMilestone: 14, accentHex: '#F59E0B' };
  }
  if (streakDays >= 3) {
    return { title: 'Kindled Habit', nextMilestone: 7, accentHex: '#FB923C' };
  }
  return { title: 'First Spark', nextMilestone: 3, accentHex: '#F59E0B' };
}

export function computeStreakSummary(
  state: DailyStreakState,
  now: Date = new Date()
): StreakSummary {
  const todayKey = getLocalDateKey(now);
  const yesterdayKey = getLocalDateKey(shiftLocalDate(now, -1));
  const activeSet = new Set(state.activeDates);

  const engagedToday = activeSet.has(todayKey);
  const anchorKey = engagedToday ? todayKey : activeSet.has(yesterdayKey) ? yesterdayKey : null;

  let currentStreak = 0;
  if (anchorKey) {
    let cursor = engagedToday ? now : shiftLocalDate(now, -1);
    while (activeSet.has(getLocalDateKey(cursor))) {
      currentStreak += 1;
      cursor = shiftLocalDate(cursor, -1);
    }
  }

  const buildWindow = (days: number): DayActivityCell[] => {
    const list: DayActivityCell[] = [];
    for (let offset = -(days - 1); offset <= 0; offset++) {
      const d = shiftLocalDate(now, offset);
      const key = getLocalDateKey(d);
      const shortDay = d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2);
      list.push({
        dateKey: key,
        shortDay,
        dayNumber: d.getDate(),
        isToday: offset === 0,
        active: activeSet.has(key),
        actions: state.dailyActions[key] || 0,
      });
    }
    return list;
  };

  return {
    currentStreak,
    longestStreak: Math.max(state.longestStreak, currentStreak),
    totalActiveDays: state.activeDates.length,
    engagedToday,
    todayActions: state.dailyActions[todayKey] || 0,
    last7Days: buildWindow(7),
    last28Days: buildWindow(28),
    rank: getStreakRank(currentStreak),
  };
}
