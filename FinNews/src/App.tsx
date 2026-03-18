/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  TrendingUp,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  BarChart3,
  Newspaper,
  ArrowUpRight,
  Globe,
  Zap,
} from 'lucide-react';

import { generateEconomicReport } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Report = {
  content: string;
  sources: { uri: string; title: string }[];
};

export default function App() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateEconomicReport();
      setReport(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
      setError('최신 정보를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-grid-slate-900/40 text-slate-50 selection:bg-emerald-500/30">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-[38rem] w-[38rem] rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[38rem] w-[38rem] rounded-full bg-sky-500/25 blur-[140px]" />
      </div>

      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 to-sky-500 shadow-lg shadow-emerald-500/30">
              <TrendingUp className="h-5 w-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xs font-semibold tracking-[0.18em] text-emerald-300/80">
                FINNEWS
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                ECONOMIC PULSE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AnimatePresence>
              {lastUpdated && !loading && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:flex"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                  Updated&nbsp;
                  {lastUpdated.toLocaleTimeString()}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={fetchReport}
              disabled={loading}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-slate-950/40 transition-all hover:-translate-y-0.5 hover:bg-white active:translate-y-0 disabled:opacity-60"
            >
              <RefreshCw
                className={cn(
                  'h-4 w-4',
                  loading && 'animate-spin text-emerald-600',
                )}
              />
              <span>{loading ? 'Syncing markets' : 'Refresh now'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.section
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex min-h-[60vh] flex-col items-center justify-center gap-8"
            >
              <div className="relative h-24 w-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-emerald-400/40 border-t-2"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-3 rounded-full border border-sky-500/30 border-b-2"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950">
                  <Zap className="h-7 w-7 text-emerald-400" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
                  Syncing live markets
                </p>
                <h2 className="bg-gradient-to-r from-slate-50 via-slate-100 to-emerald-200 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                  전 세계 경제 데이터와 뉴스를 불러오는 중입니다
                </h2>
                <p className="text-sm text-slate-400">
                  최근 24시간 동안 발표된 거시 지표, 연준 발언, 주요 지수 흐름을 분석합니다.
                </p>
              </div>
            </motion.section>
          ) : error ? (
            <motion.section
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-md"
            >
              <div className="glass-elevated flex flex-col items-center gap-6 rounded-3xl p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 ring-1 ring-red-500/30">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2 text-center">
                  <h2 className="text-lg font-semibold tracking-tight">
                    분석 엔진 오류
                  </h2>
                  <p className="text-sm text-slate-400">{error}</p>
                </div>
                <button
                  onClick={fetchReport}
                  className="rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-md shadow-slate-900/40 transition hover:bg-white"
                >
                  다시 시도하기
                </button>
              </div>
            </motion.section>
          ) : (
            <section
              key="report"
              className="grid gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]"
            >
              {/* Left: Hero + Report */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <header className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-emerald-200">
                    <Globe className="h-3 w-3" />
                    Live macro brief · 24h
                  </div>
                  <div className="space-y-3">
                    <h1 className="bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                      미국 시장·연준·기술주의
                      <br />
                      오늘 맥락 한 번에 읽기
                    </h1>
                    <p className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>
                        {new Date().toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          weekday: 'short',
                        })}
                      </span>
                      <span className="h-0.5 w-6 rounded-full bg-slate-700" />
                      <span className="uppercase tracking-[0.26em] text-emerald-300/80">
                        AI generated · Gemini
                      </span>
                    </p>
                  </div>
                </header>

                <article className="glass-elevated group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-950/60 p-5 sm:p-7 lg:p-8">
                  <div className="pointer-events-none absolute right-0 top-0 translate-x-6 -translate-y-6 opacity-10 transition-opacity group-hover:opacity-25">
                    <Newspaper className="h-28 w-28 rotate-12 text-slate-100" />
                  </div>
                  <div className="markdown-body relative max-h-[70vh] overflow-y-auto pr-2">
                    <ReactMarkdown>{report?.content ?? ''}</ReactMarkdown>
                  </div>
                </article>
              </motion.div>

              {/* Right: Stats + Sources */}
              <motion.aside
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="space-y-5"
              >
                {/* Market stats */}
                <div className="grid gap-4">
                  <div className="glass-elevated flex flex-col justify-between rounded-2xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Market sentiment
                        </p>
                        <p className="font-display text-3xl font-semibold tracking-tight">
                          BULLISH
                        </p>
                      </div>
                      <div className="rounded-xl bg-emerald-400/15 p-2 text-emerald-300">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-200">
                      <ArrowUpRight className="h-3 w-3" />
                      AI confidence 94%
                    </p>
                  </div>

                  <div className="glass-elevated space-y-3 rounded-2xl p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Real‑time indicators
                    </p>
                    <div className="space-y-2">
                      {[
                        { label: 'S&P 500', value: 'Analyzing', color: 'bg-emerald-400' },
                        { label: 'NASDAQ', value: 'Analyzing', color: 'bg-sky-400' },
                        { label: 'FED FUNDS', value: 'Steady', color: 'bg-amber-400' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs"
                        >
                          <span className="font-medium text-slate-200">
                            {stat.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-slate-400">
                              {stat.value}
                            </span>
                            <span
                              className={cn(
                                'h-1.5 w-1.5 rounded-full animate-[pulse_1.4s_ease_infinite]',
                                stat.color,
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sources */}
                <div className="glass-elevated space-y-3 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Intelligence sources
                    </p>
                    <Newspaper className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="space-y-2">
                    {report?.sources && report.sources.length > 0 ? (
                      report.sources.map((source, idx) => (
                        <a
                          key={`${source.uri}-${idx}`}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs transition hover:border-emerald-400/40 hover:bg-slate-900"
                        >
                          <span className="line-clamp-2 text-left text-slate-200 group-hover:text-slate-50">
                            {source.title}
                          </span>
                          <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-500 group-hover:text-emerald-300" />
                        </a>
                      ))
                    ) : (
                      <div className="flex flex-col items-center gap-1 py-4 text-[11px] text-slate-500">
                        <Globe className="h-5 w-5" />
                        <span>No external links resolved</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/70 p-3">
                  <p className="text-[10px] leading-relaxed text-slate-500">
                    이 리포트는 Google Gemini와 실시간 웹 검색 결과를 기반으로 자동 생성됩니다.
                    투자 결정 전에는 반드시 본인의 판단과 추가 검증이 필요합니다.
                  </p>
                </div>
              </motion.aside>
            </section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-[11px] text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="font-semibold tracking-tight">FinNews Pulse</span>
          </div>
          <div className="flex gap-6 uppercase tracking-[0.18em]">
            <span>Markets</span>
            <span>Macro</span>
            <span>AI research</span>
          </div>
          <p>© 2026 FinNews. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
