import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MessageSquare,
  Send,
  Square,
  Trash2,
  X,
  Compass,
  WifiOff,
  AlertTriangle,
  CornerDownRight,
} from 'lucide-react';
import { SkillNode } from '../types/curriculum';
import { MorphingCopyButton } from './ui/WatermelonUI';

export interface MentorMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  topicTitle?: string;
}

interface SkillMentorChatProps {
  skill: SkillNode;
  domainName: string;
  completedTopics: number;
  totalTopics: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  focusedTopicId: string | null;
  onSelectTopicId: (topicId: string | null) => void;
}

interface FlatTopicOption {
  id: string;
  dayRange: string;
  moduleTitle: string;
  title: string;
  summary: string;
  resourceTitles: string[];
}

const STORAGE_PREFIX = 'polymath_mentor_chat_v1_';

function loadStoredMessages(skillId: string): MentorMessage[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${skillId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is MentorMessage =>
          Boolean(m) &&
          typeof m.id === 'string' &&
          (m.role === 'user' || m.role === 'model') &&
          typeof m.text === 'string'
      )
      .slice(-40);
  } catch {
    return [];
  }
}

function saveStoredMessages(skillId: string, messages: MentorMessage[]) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${skillId}`, JSON.stringify(messages.slice(-40)));
  } catch {
    // Ignore storage quota errors
  }
}

function renderInlineFormatted(text: string): React.ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={idx}
          className="rounded bg-[#141928] border border-[rgba(244,241,234,0.12)] px-1.5 py-0.5 font-mono-data text-[11px] text-[#93C5FD]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={idx} className="font-semibold text-[#F4F1EA]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

const MentorMessageBody: React.FC<{ text: string }> = ({ text }) => {
  const [copiedBlockKey, setCopiedBlockKey] = useState<string | null>(null);

  const segments = useMemo(() => {
    const parts: ({ type: 'text'; content: string } | { type: 'code'; lang: string; content: string })[] = [];
    const codeFenceRegex = /```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeFenceRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      parts.push({
        type: 'code',
        lang: match[1] || 'code',
        content: match[2].replace(/\n$/, ''),
      });
      lastIndex = codeFenceRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts;
  }, [text]);

  const handleCopyCode = (key: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedBlockKey(key);
    setTimeout(() => setCopiedBlockKey(null), 1600);
  };

  return (
    <div className="space-y-2.5 text-[13px] leading-relaxed text-slate-200 break-words">
      {segments.map((seg, sIdx) => {
        if (seg.type === 'code') {
          const blockKey = `code-${sIdx}`;
          return (
            <div
              key={sIdx}
              className="overflow-hidden rounded-xl border border-[rgba(244,241,234,0.12)] bg-[#06070A]"
            >
              <div className="flex items-center justify-between border-b border-[rgba(244,241,234,0.08)] bg-[#0B0D14] px-3 py-1.5">
                <span className="font-mono-data text-[10px] text-slate-300">
                  {seg.lang}
                </span>
                <MorphingCopyButton
                  copied={copiedBlockKey === blockKey}
                  onClick={() => handleCopyCode(blockKey, seg.content)}
                />
              </div>
              <pre className="overflow-x-auto p-3 font-mono-data text-[11.5px] leading-relaxed text-slate-200">
                <code>{seg.content}</code>
              </pre>
            </div>
          );
        }

        const lines = seg.content.split('\n');
        const elements: React.ReactNode[] = [];
        let listBuffer: { ordered: boolean; items: string[] } | null = null;

        const flushList = (keyPrefix: string) => {
          if (!listBuffer) return;
          if (listBuffer.ordered) {
            elements.push(
              <ol key={keyPrefix} className="list-decimal pl-5 space-y-1 text-slate-200">
                {listBuffer.items.map((item, i) => (
                  <li key={i}>{renderInlineFormatted(item)}</li>
                ))}
              </ol>
            );
          } else {
            elements.push(
              <ul key={keyPrefix} className="list-disc pl-5 space-y-1 text-slate-200">
                {listBuffer.items.map((item, i) => (
                  <li key={i}>{renderInlineFormatted(item)}</li>
                ))}
              </ul>
            );
          }
          listBuffer = null;
        };

        lines.forEach((rawLine, lIdx) => {
          const line = rawLine.trimEnd();
          const trimmed = line.trim();

          if (!trimmed) {
            flushList(`list-${sIdx}-${lIdx}`);
            return;
          }

          const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
          if (headingMatch) {
            flushList(`list-${sIdx}-${lIdx}`);
            elements.push(
              <div
                key={`h-${sIdx}-${lIdx}`}
                className="font-display text-base font-semibold text-[#F4F1EA] pt-1"
              >
                {renderInlineFormatted(headingMatch[2])}
              </div>
            );
            return;
          }

          const unorderedMatch = trimmed.match(/^[-*•]\s+(.+)$/);
          if (unorderedMatch) {
            if (listBuffer && listBuffer.ordered) {
              flushList(`list-${sIdx}-${lIdx}`);
            }
            if (!listBuffer) {
              listBuffer = { ordered: false, items: [] };
            }
            listBuffer.items.push(unorderedMatch[1]);
            return;
          }

          const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
          if (orderedMatch) {
            if (listBuffer && !listBuffer.ordered) {
              flushList(`list-${sIdx}-${lIdx}`);
            }
            if (!listBuffer) {
              listBuffer = { ordered: true, items: [] };
            }
            listBuffer.items.push(orderedMatch[1]);
            return;
          }

          flushList(`list-${sIdx}-${lIdx}`);
          elements.push(
            <p key={`p-${sIdx}-${lIdx}`} className="text-slate-200">
              {renderInlineFormatted(trimmed)}
            </p>
          );
        });

        flushList(`list-end-${sIdx}`);
        return <React.Fragment key={sIdx}>{elements}</React.Fragment>;
      })}
    </div>
  );
};

export const SkillMentorChat: React.FC<SkillMentorChatProps> = ({
  skill,
  domainName,
  completedTopics,
  totalTopics,
  isOpen,
  onOpenChange,
  focusedTopicId,
  onSelectTopicId,
}) => {
  const [messages, setMessages] = useState<MentorMessage[]>(() =>
    loadStoredMessages(skill.id)
  );
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const abortRef = useRef<AbortController | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const flatTopics = useMemo<FlatTopicOption[]>(() => {
    const list: FlatTopicOption[] = [];
    for (const mod of skill.dayModules) {
      for (const topic of mod.topics) {
        list.push({
          id: topic.id,
          dayRange: mod.dayRange,
          moduleTitle: mod.title,
          title: topic.title,
          summary: topic.summary,
          resourceTitles: topic.resources.map((r) => `${r.title} (${r.provider})`),
        });
      }
    }
    return list;
  }, [skill]);

  const focusedTopic = useMemo(
    () => flatTopics.find((t) => t.id === focusedTopicId) ?? null,
    [flatTopics, focusedTopicId]
  );

  useEffect(() => {
    setMessages(loadStoredMessages(skill.id));
    setErrorMsg(null);
    abortRef.current?.abort();
    setIsStreaming(false);
  }, [skill.id]);

  useEffect(() => {
    saveStoredMessages(skill.id, messages);
  }, [skill.id, messages]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isOpen, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const timer = setTimeout(() => inputRef.current?.focus(), 160);
      return () => clearTimeout(timer);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus?.();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const starterPrompts = useMemo(() => {
    if (focusedTopic) {
      return [
        `Break down "${focusedTopic.title}" with a first-principles analogy and concrete example.`,
        `What common mistakes do learners make when applying "${focusedTopic.title}"?`,
        `Give me a quick 1-question check to verify I understand "${focusedTopic.title}".`,
      ];
    }
    return [
      `What is the fastest mental model to master ${skill.title}?`,
      `Walk me through how the day modules build toward the capstone projects.`,
      `Quiz me on a core concept from ${skill.title} to test my readiness.`,
    ];
  }, [focusedTopic, skill.title]);

  const handleStopStreaming = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  };

  const handleClearChat = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setErrorMsg(null);
    setMessages([]);
    localStorage.removeItem(`${STORAGE_PREFIX}${skill.id}`);
  };

  const handleSend = async (overrideText?: string) => {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || isStreaming) return;

    if (!isOnline) {
      setErrorMsg('You are offline. Reconnect to ask the live Gemini Mentor.');
      return;
    }

    setErrorMsg(null);
    if (!overrideText) {
      setInput('');
    }

    const userMsg: MentorMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      topicTitle: focusedTopic?.title,
    };
    const modelMsgId = `m-${Date.now() + 1}`;
    const placeholderModelMsg: MentorMessage = {
      id: modelMsgId,
      role: 'model',
      text: '',
      topicTitle: focusedTopic?.title,
    };

    const historyForRequest = messages
      .filter((m) => m.text.trim().length > 0)
      .slice(-12)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg, placeholderModelMsg]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          skillTitle: skill.title,
          domainName,
          tier: skill.tier,
          skillSummary: skill.summary,
          completedTopics,
          totalTopics,
          focusedTopic,
          curriculumOutline: skill.dayModules.map((mod) => ({
            dayRange: mod.dayRange,
            moduleTitle: mod.title,
            topicTitles: mod.topics.map((t) => t.title),
          })),
          history: historyForRequest,
          message: trimmed,
        }),
      });

      if (!response.ok) {
        let serverError = `Request failed (${response.status})`;
        try {
          const data = await response.json();
          if (typeof data?.error === 'string' && data.error.trim()) {
            serverError = data.error;
          }
        } catch {
          // Use status fallback
        }
        throw new Error(serverError);
      }

      if (!response.body) {
        throw new Error('Streaming response body is unavailable.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';

        for (const evt of events) {
          const lines = evt.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const payloadRaw = line.slice(6).trim();
            if (!payloadRaw) continue;
            try {
              const payload = JSON.parse(payloadRaw) as {
                delta?: string;
                done?: boolean;
                error?: string;
              };
              if (payload.error) {
                throw new Error(payload.error);
              }
              if (payload.delta) {
                accumulated += payload.delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === modelMsgId ? { ...m, text: accumulated } : m
                  )
                );
              }
            } catch (parseErr) {
              if (
                parseErr instanceof Error &&
                parseErr.message !== 'Unexpected end of JSON input' &&
                !parseErr.message.includes('JSON')
              ) {
                throw parseErr;
              }
            }
          }
        }
      }

      if (!accumulated.trim()) {
        setMessages((prev) => prev.filter((m) => m.id !== modelMsgId));
        setErrorMsg('Mentor returned an empty response. Please try again.');
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setMessages((prev) =>
          prev.filter((m) => m.id !== modelMsgId || m.text.trim().length > 0)
        );
      } else {
        const msg =
          err instanceof Error
            ? err.message
            : 'Unable to reach Skill Mentor right now.';
        setMessages((prev) =>
          prev.filter((m) => m.id !== modelMsgId || m.text.trim().length > 0)
        );
        setErrorMsg(msg);
      }
    } finally {
      abortRef.current = null;
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Compact Floating Launcher */}
      {!isOpen && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onOpenChange(true)}
          aria-label={`Open Skill Mentor for ${skill.title}`}
          className="fixed bottom-4 right-4 z-40 inline-flex h-10 items-center gap-2 rounded-xl border border-[rgba(244,241,234,0.16)] bg-[#0E111B] px-3.5 text-xs font-semibold text-[#F4F1EA] shadow-[0_14px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(37,99,235,0.22)] hover:border-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
        >
          <MessageSquare className="h-4 w-4 text-[#60A5FA]" />
          <span>Skill Mentor</span>
        </motion.button>
      )}

      {/* Expandable Floating Mentor Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mentor-chat-drawer"
            role="dialog"
            aria-modal="false"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: 'spring', duration: 0.32, bounce: 0 }}
            aria-label={`${skill.title} Mentor Chat`}
            className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 flex h-[min(78vh,620px)] sm:w-[440px] flex-col overflow-hidden overscroll-contain rounded-2xl border border-[rgba(244,241,234,0.14)] bg-[#0E111B] shadow-[0_24px_80px_rgba(0,0,0,0.82),0_0_40px_rgba(37,99,235,0.18)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[rgba(244,241,234,0.1)] bg-[#0B0D14] px-4 py-3.5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[#60A5FA] shrink-0" />
                  <h3 className="font-display text-base font-semibold text-[#F4F1EA] truncate">
                    Skill Mentor
                  </h3>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-mono-data text-slate-300 truncate">
                  <span className="truncate">{skill.title}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums shrink-0">
                    {completedTopics}/{totalTopics} topics
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    title="Clear conversation"
                    aria-label="Clear conversation"
                    className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-500/70 bg-[#06070A] px-2.5 text-[11px] font-medium text-slate-300 hover:border-[#60A5FA] hover:text-[#F4F1EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close Skill Mentor"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-500/70 bg-[#06070A] text-slate-300 hover:border-[#60A5FA] hover:text-[#F4F1EA] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Topic Focus Selector */}
            <div className="border-b border-[rgba(244,241,234,0.08)] bg-[#0B0D14] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="mentor-topic-focus"
                  className="text-[11px] font-mono-data text-slate-300 whitespace-nowrap shrink-0"
                >
                  Context:
                </label>
                <select
                  id="mentor-topic-focus"
                  value={focusedTopicId ?? ''}
                  onChange={(e) => onSelectTopicId(e.target.value || null)}
                  className="min-w-0 flex-1 rounded-lg border border-slate-500 bg-[#0E111B] px-2.5 py-1.5 text-base sm:text-xs font-medium text-[#F4F1EA] focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] truncate"
                >
                  <option value="">Entire Skill Overview ({skill.title})</option>
                  {flatTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.dayRange} · {topic.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Offline Warning Banner */}
            {!isOnline && (
              <div className="flex items-center gap-2 border-b border-amber-500/35 bg-amber-950/35 px-4 py-2 text-xs text-amber-200">
                <WifiOff className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>Offline mode — reconnect to ask new Mentor questions.</span>
              </div>
            )}

            {/* Message History */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 bg-[#06070A]"
            >
              {messages.length === 0 ? (
                <div className="space-y-4 pt-2">
                  <div className="rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0E111B] p-4 space-y-1.5">
                    <div className="text-xs font-semibold text-[#F4F1EA]">
                      {focusedTopic
                        ? `Focused on: ${focusedTopic.title}`
                        : `Ask anything about ${skill.title}`}
                    </div>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {focusedTopic
                        ? focusedTopic.summary
                        : 'Select any topic above or ask a clarifying question about concepts, code, equations, or project tradeoffs.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono-data text-slate-400">
                      Suggested Questions
                    </div>
                    {starterPrompts.map((promptText, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(promptText)}
                        disabled={isStreaming || !isOnline}
                        className="w-full flex items-start gap-2 rounded-xl border border-[rgba(244,241,234,0.1)] bg-[#0B0D14] px-3.5 py-2.5 text-left text-xs text-slate-200 hover:border-[#60A5FA]/70 hover:text-[#F4F1EA] transition-colors cursor-pointer disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                      >
                        <CornerDownRight className="h-3.5 w-3.5 text-[#60A5FA] shrink-0 mt-0.5" />
                        <span>{promptText}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  const isEmptyModel = !isUser && !msg.text.trim();
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      {msg.topicTitle && isUser && (
                        <div className="mb-1 text-[10px] font-mono-data text-slate-400 max-w-[88%] truncate">
                          Re: {msg.topicTitle}
                        </div>
                      )}
                      <div
                        className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 ${
                          isUser
                            ? 'border border-[#2563EB]/55 bg-[#2563EB]/20 text-[#F4F1EA]'
                            : 'border border-[rgba(244,241,234,0.1)] bg-[#0E111B] text-slate-200'
                        }`}
                      >
                        {isUser ? (
                          <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words">
                            {msg.text}
                          </p>
                        ) : isEmptyModel ? (
                          <span className="text-xs font-mono-data text-slate-300">
                            Thinking…
                          </span>
                        ) : (
                          <MentorMessageBody text={msg.text} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {errorMsg && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-500/45 bg-rose-950/35 px-3.5 py-2.5 text-xs text-rose-200">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-[rgba(244,241,234,0.1)] bg-[#0B0D14] p-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={
                    focusedTopic
                      ? `Ask about ${focusedTopic.title}…`
                      : `Ask a question about ${skill.title}…`
                  }
                  disabled={!isOnline}
                  className="min-h-[44px] max-h-28 flex-1 resize-none rounded-xl border border-slate-500 bg-[#06070A] px-3 py-2 text-base sm:text-[13px] text-[#F4F1EA] placeholder:text-slate-400 focus:border-[#60A5FA] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#60A5FA] disabled:opacity-60"
                />

                {isStreaming ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={handleStopStreaming}
                    aria-label="Stop response"
                    className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-slate-500 bg-[#141928] px-3.5 text-xs font-semibold text-[#F4F1EA] hover:border-[#60A5FA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop</span>
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    whileTap={!input.trim() || !isOnline ? undefined : { scale: 0.96 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim() || !isOnline}
                    aria-label="Send message"
                    className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white hover:bg-[#3B82F6] transition-colors disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Ask</span>
                  </motion.button>
                )}
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono-data text-slate-400">
                <span>Press Enter to send · Shift+Enter for new line</span>
                <span>Context-aware · {skill.estimatedDays}d track</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
