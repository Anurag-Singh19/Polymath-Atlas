import React, { useEffect, useMemo, useState } from 'react';
import { Shuffle, RotateCcw, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SkillNode, UserProgressState } from '../types/curriculum';
import { MotionSegmentedControl } from './ui/WatermelonUI';

interface AdaptiveFlashcardsProps {
  skill: SkillNode;
  progress: UserProgressState;
  onToggleCardMastered: (cardId: string) => void;
}

export const AdaptiveFlashcards: React.FC<AdaptiveFlashcardsProps> = ({
  skill,
  progress,
  onToggleCardMastered,
}) => {
  const [deckMode, setDeckMode] = useState<'covered' | 'all'>('covered');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string>('');
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches),
    []
  );

  const coveredTopicIds = useMemo(() => {
    const allTopicIds = skill.dayModules.flatMap((m) => m.topics.map((t) => t.id));
    if (progress.demoPolymathMode) return new Set(allTopicIds);
    return new Set(allTopicIds.filter((id) => Boolean(progress.completedTopicIds[id])));
  }, [skill, progress.completedTopicIds, progress.demoPolymathMode]);

  const activeDeck = useMemo(() => {
    if (deckMode === 'all') return skill.flashcards;
    const filtered = skill.flashcards.filter((fc) => coveredTopicIds.has(fc.topicId));
    return filtered;
  }, [skill.flashcards, deckMode, coveredTopicIds]);

  const pickRandomCard = (excludeId?: string) => {
    if (activeDeck.length === 0) {
      setCurrentCardId('');
      return;
    }
    const candidates =
      activeDeck.length > 1 && excludeId
        ? activeDeck.filter((c) => c.id !== excludeId)
        : activeDeck;
    const unmastered = candidates.filter((c) => !progress.masteredCardIds[c.id]);
    const pool = unmastered.length > 0 ? unmastered : candidates;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    setIsFlipped(false);
    setCurrentCardId(chosen.id);
    setHistoryIds((prev) => [...prev.slice(-15), chosen.id]);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [skill.id]);

  // Sync automatically whenever the skill or covered topics change
  useEffect(() => {
    if (activeDeck.length === 0) {
      setCurrentCardId('');
      setIsFlipped(false);
      return;
    }
    const stillValid = activeDeck.some((c) => c.id === currentCardId);
    if (!stillValid) {
      const chosen = activeDeck[Math.floor(Math.random() * activeDeck.length)];
      setCurrentCardId(chosen.id);
      setIsFlipped(false);
    }
  }, [activeDeck, currentCardId]);

  const currentCard = activeDeck.find((c) => c.id === currentCardId) || activeDeck[0] || null;
  const masteredCount = activeDeck.filter((c) => Boolean(progress.masteredCardIds[c.id])).length;
  const coveredCardsCount = skill.flashcards.filter((fc) => coveredTopicIds.has(fc.topicId)).length;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      rx: Number((-ny * 4.5).toFixed(2)),
      ry: Number((nx * 5.5).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      id="adaptive-flashcards"
      className="rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B] shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 sm:p-8 space-y-6"
    >
      {/* Header & Deck Mode Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-data text-slate-300">
            <span className="text-[#60A5FA]">05 · Adaptive Topic Recall</span>
            <span aria-hidden="true">·</span>
            <span>{coveredTopicIds.size} covered topics feeding deck</span>
            <span aria-hidden="true">·</span>
            <span>{masteredCount}/{activeDeck.length} mastered</span>
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#F4F1EA]">
            Random Topic Flashcards
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Questions automatically update and randomize from the topics you have checked off above.
          </p>
        </div>

        {/* Mode Switcher */}
        <MotionSegmentedControl
          layoutId="wm-flashcards-mode"
          value={deckMode}
          onChange={setDeckMode}
          variant={deckMode === 'all' ? 'mint' : 'pill'}
          options={[
            {
              id: 'covered',
              label: 'Covered Topics',
              count: coveredCardsCount,
            },
            {
              id: 'all',
              label: 'All Skill Cards',
              count: skill.flashcards.length,
            },
          ]}
        />
      </div>

      {/* Empty Covered State vs Active 3D Flip Card */}
      {activeDeck.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[rgba(244,241,234,0.16)] bg-[#0B0D14] p-8 text-center space-y-4">
          <HelpCircle className="mx-auto h-9 w-9 text-[#60A5FA]" />
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="font-display text-xl font-semibold text-[#F4F1EA]">
              Check off any topic above to unlock targeted flashcards
            </h3>
            <p className="text-sm text-slate-300">
              Your adaptive flashcard deck pulls random questions strictly matching your completed checklist topics. Or preview the entire skill deck right now.
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setDeckMode('all')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3B82F6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Practice Full Skill Deck ({skill.flashcards.length} Cards)
          </motion.button>
        </div>
      ) : (
        currentCard && (
          <div className="space-y-5">
            {/* 3D Spring Flip Card with Pointer Perspective Tilt */}
            <div
              className="perspective-1200"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <motion.button
                type="button"
                data-cursor="open"
                data-cursor-label={isFlipped ? 'FRONT' : 'FLIP'}
                onClick={() => setIsFlipped((f) => !f)}
                aria-label={isFlipped ? 'Show flashcard question' : 'Reveal flashcard answer'}
                animate={{
                  rotateY: (isFlipped ? 180 : 0) + (reducedMotion ? 0 : tilt.ry),
                  rotateX: reducedMotion ? 0 : tilt.rx,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0.15 }
                    : { type: 'spring', duration: 0.45, bounce: 0 }
                }
                style={{ transformStyle: 'preserve-3d' }}
                className="grid w-full min-h-[260px] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] rounded-2xl"
              >
                {/* Front Face (Question) */}
                <div className="backface-hidden col-start-1 row-start-1 flex flex-col justify-between rounded-2xl border border-[rgba(244,241,234,0.12)] bg-[#0B0D14] shadow-[inset_0_1px_0_rgba(244,241,234,0.06)] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-data">
                    <span className="text-[#60A5FA] font-semibold">
                      Topic · {currentCard.topicTitle}
                    </span>
                    <span className="text-slate-400">
                      {currentCard.difficulty} · Seen {historyIds.filter((id) => id === currentCard.id).length}x
                    </span>
                  </div>

                  <div className="my-4">
                    <div className="text-xs font-mono-data text-slate-400 mb-2">Question</div>
                    <p className="font-display text-2xl sm:text-3xl font-semibold leading-snug text-[#F4F1EA]">
                      {currentCard.question}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-[rgba(244,241,234,0.08)]">
                    <span>Click card to flip for answer</span>
                    {progress.masteredCardIds[currentCard.id] && (
                      <span className="text-[#34D399] font-mono-data font-semibold">
                        Mastered
                      </span>
                    )}
                  </div>
                </div>

                {/* Back Face (Answer) */}
                <div className="backface-hidden rotate-y-180 col-start-1 row-start-1 flex flex-col justify-between rounded-2xl border border-[#10B981]/50 bg-[#091A16] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-data">
                    <span className="text-[#34D399] font-semibold">
                      Answer · {currentCard.topicTitle}
                    </span>
                    <span className="text-slate-300">{currentCard.difficulty}</span>
                  </div>

                  <div className="my-4">
                    <p className="text-base sm:text-lg leading-relaxed text-[#F4F1EA]">
                      {currentCard.answer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-[rgba(244,241,234,0.08)]">
                    <span>Click card to flip back to question</span>
                    <span className="font-mono-data text-[#34D399]">Active Recall Check</span>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Flashcard Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsFlipped((f) => !f)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-500/70 bg-[#0B0D14] px-4 py-2.5 text-xs font-semibold text-[#F4F1EA] hover:border-[#60A5FA] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {isFlipped ? 'Show Question' : 'Flip Answer'}
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onToggleCardMastered(currentCard.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
                    progress.masteredCardIds[currentCard.id]
                      ? 'border-[#10B981] bg-[#10B981]/20 text-[#34D399]'
                      : 'border-slate-500/70 bg-[#0B0D14] text-slate-300 hover:text-[#F4F1EA]'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {progress.masteredCardIds[currentCard.id] ? 'Mastered' : 'Mark Mastered'}
                </motion.button>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => pickRandomCard(currentCard.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3B82F6] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <Shuffle className="h-3.5 w-3.5" />
                Next Random Question
              </motion.button>
            </div>
          </div>
        )
      )}
    </section>
  );
};
