import { eq } from 'drizzle-orm';
import { db } from './index.ts';
import { userProgress, users } from './schema.ts';
import type { SkillNode, UserProgressState } from '../types/curriculum.ts';

const EMPTY_PROGRESS: UserProgressState = {
  completedTopicIds: {},
  masteredCardIds: {},
  bookmarkedItems: {},
  demoPolymathMode: false,
  customSkills: [],
};

function sanitizeBooleanMap(input: unknown): Record<string, boolean> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {};
  }
  const clean: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof key === 'string' && value === true) {
      clean[key] = true;
    }
  }
  return clean;
}

function sanitizeCustomSkills(input: unknown): SkillNode[] {
  if (!Array.isArray(input)) return [];
  return input.filter(
    (s): s is SkillNode =>
      Boolean(s && typeof s === 'object' && typeof (s as SkillNode).id === 'string' && typeof (s as SkillNode).title === 'string')
  );
}

export async function getOrCreateUser(
  uid: string,
  email: string,
  displayName?: string | null
) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName ?? null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName ?? null,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed in getOrCreateUser:', error);
    throw new Error('Unable to synchronize user profile.', { cause: error });
  }
}

export async function getUserProgress(
  uid: string,
  email: string,
  displayName?: string | null
): Promise<UserProgressState> {
  try {
    const user = await getOrCreateUser(uid, email, displayName);
    const rows = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, user.id));

    if (rows.length === 0) {
      return { ...EMPTY_PROGRESS };
    }

    const row = rows[0];
    return {
      completedTopicIds: sanitizeBooleanMap(row.completedTopicIds),
      masteredCardIds: sanitizeBooleanMap(row.masteredCardIds),
      bookmarkedItems: sanitizeBooleanMap(row.bookmarkedItems),
      customSkills: sanitizeCustomSkills(row.customSkills),
      demoPolymathMode: Boolean(row.demoPolymathMode),
    };
  } catch (error) {
    console.error('Database query failed in getUserProgress:', error);
    throw new Error('Unable to load learning progress.', { cause: error });
  }
}

export async function saveUserProgress(
  uid: string,
  email: string,
  displayName: string | null | undefined,
  payload: UserProgressState
): Promise<UserProgressState> {
  try {
    const user = await getOrCreateUser(uid, email, displayName);
    const cleanCompleted = sanitizeBooleanMap(payload.completedTopicIds);
    const cleanMastered = sanitizeBooleanMap(payload.masteredCardIds);
    const cleanBookmarks = sanitizeBooleanMap(payload.bookmarkedItems);
    const cleanCustomSkills = sanitizeCustomSkills(payload.customSkills);
    const cleanDemo = Boolean(payload.demoPolymathMode);

    const rows = await db
      .insert(userProgress)
      .values({
        userId: user.id,
        completedTopicIds: cleanCompleted,
        masteredCardIds: cleanMastered,
        bookmarkedItems: cleanBookmarks,
        customSkills: cleanCustomSkills,
        demoPolymathMode: cleanDemo,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: userProgress.userId,
        set: {
          completedTopicIds: cleanCompleted,
          masteredCardIds: cleanMastered,
          bookmarkedItems: cleanBookmarks,
          customSkills: cleanCustomSkills,
          demoPolymathMode: cleanDemo,
          updatedAt: new Date(),
        },
      })
      .returning();

    const row = rows[0];
    return {
      completedTopicIds: sanitizeBooleanMap(row.completedTopicIds),
      masteredCardIds: sanitizeBooleanMap(row.masteredCardIds),
      bookmarkedItems: sanitizeBooleanMap(row.bookmarkedItems),
      customSkills: sanitizeCustomSkills(row.customSkills),
      demoPolymathMode: Boolean(row.demoPolymathMode),
    };
  } catch (error) {
    console.error('Database query failed in saveUserProgress:', error);
    throw new Error('Unable to save learning progress.', { cause: error });
  }
}
