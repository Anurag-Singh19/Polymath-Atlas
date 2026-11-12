import React, { useEffect, useMemo, useState } from 'react';
import { Shuffle, RotateCcw, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { SkillNode, UserProgressState } from '../types/curriculum';

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

  return (
    <section
      id="adaptive-flashcards"
      className="rounded-2xl border border-white/10 bg-[#141B17] p-6 sm:p-8 space-y-6"
    >
      {/* Header & Deck Mode Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-data text-[#A7B5AE]">
            <span>Adaptive Topic Recall</span>
            <span aria-hidden="true">·</span>
            <span>{coveredTopicIds.size} covered topics feeding deck</span>
            <span aria-hidden="true">·</span>
            <span>{masteredCount}/{activeDeck.length} mastered</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold text-[#F1F5F3]">
            Random Topic Flashcards
          </h2>
          <p className="mt-1 text-sm text-[#A7B5AE]">
            Questions automatically update and randomize from the topics you have checked off above.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#0F1412] p-1">
            <button
              type="button"
              onClick={() => setDeckMode('covered')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                deckMode === 'covered'
                  ? 'bg-[#FF3366] text-white'
                  : 'text-[#A7B5AE] hover:text-white'
              }`}
            >
              Covered Topics ({skill.flashcards.filter((fc) => coveredTopicIds.has(fc.topicId)).length})
            </button>
            <button
              type="button"
              onClick={() => setDeckMode('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                deckMode === 'all'
                  ? 'bg-[#10B981] text-[#090D0B]'
                  : 'text-[#A7B5AE] hover:text-white'
              }`}
            >
              All Skill Cards ({skill.flashcards.length})
            </button>
          </div>
        </div>
      </div>

      {/* Empty Covered State vs Active 3D Flip Card */}
      {activeDeck.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#0F1412] p-8 text-center space-y-4">
          <HelpCircle className="mx-auto h-9 w-9 text-[#FF3366]" />
          <div className="space-y-1 max-w-lg mx-auto">
            <h3 className="font-display text-lg font-semibold text-[#F1F5F3]">
              Check off any topic above to unlock targeted flashcards
            </h3>
            <p className="text-sm text-[#A7B5AE]">
              Your adaptive flashcard deck pulls random questions strictly matching your completed checklist topics. Or preview the entire skill deck right now.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDeckMode('all')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF3366] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#E11D48] transition-colors cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Practice Full Skill Deck ({skill.flashcards.length} Cards)
          </button>
        </div>
      ) : (
        currentCard && (
          <div className="space-y-5">
            {/* 3D Flip Card Container */}
            <div className="perspective-1200">
              <button
                type="button"
                onClick={() => setIsFlipped((f) => !f)}
                aria-label={isFlipped ? 'Show flashcard question' : 'Reveal flashcard answer'}
                className={`relative block w-full min-h-[260px] text-left transition-transform duration-500 preserve-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Face (Question) */}
                <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/12 bg-[#0F1412] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-data">
                    <span className="text-[#FF3366] font-semibold">
                      Topic · {currentCard.topicTitle}
                    </span>
                    <span className="text-[#708078]">
                      {currentCard.difficulty} · Seen {historyIds.filter((id) => id === currentCard.id).length}x
                    </span>
                  </div>

                  <div className="my-4">
                    <div className="text-xs font-mono-data text-[#708078] mb-2">Question</div>
                    <p className="font-display text-xl sm:text-2xl font-semibold leading-snug text-[#F1F5F3]">
                      {currentCard.question}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#A7B5AE] pt-3 border-t border-white/8">
                    <span>Click card to flip for answer</span>
                    {progress.masteredCardIds[currentCard.id] && (
                      <span className="text-[#10B981] font-mono-data font-semibold">
                        Mastered
                      </span>
                    )}
                  </div>
                </div>

                {/* Back Face (Answer) */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#10B981]/50 bg-[#102019] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-data">
                    <span className="text-[#10B981] font-semibold">
                      Answer · {currentCard.topicTitle}
                    </span>
                    <span className="text-[#A7B5AE]">{currentCard.difficulty}</span>
                  </div>

                  <div className="my-4">
                    <p className="text-base sm:text-lg leading-relaxed text-[#F1F5F3]">
                      {currentCard.answer}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#A7B5AE] pt-3 border-t border-white/10">
                    <span>Click card to flip back to question</span>
                    <span className="font-mono-data text-[#10B981]">Active Recall Check</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Flashcard Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFlipped((f) => !f)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#0F1412] px-4 py-2.5 text-xs font-semibold text-[#F1F5F3] hover:border-white/30 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {isFlipped ? 'Show Question' : 'Flip Answer'}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCardMastered(currentCard.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    progress.masteredCardIds[currentCard.id]
                      ? 'border-[#10B981] bg-[#10B981]/20 text-[#10B981]'
                      : 'border-white/15 bg-[#0F1412] text-[#A7B5AE] hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {progress.masteredCardIds[currentCard.id] ? 'Mastered' : 'Mark Mastered'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => pickRandomCard(currentCard.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF3366] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#E11D48] transition-colors cursor-pointer"
              >
                <Shuffle className="h-3.5 w-3.5" />
                Next Random Question
              </button>
            </div>
          </div>
        )
      )}
    </section>
  );
};
