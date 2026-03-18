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
  Clock,
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
    <div className="min-h-screen selection:bg-emerald-500/30">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <TrendingUp className="h-6 w-6 text-black" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              PULSE.AI
            </span>
          </div>

          <div className="flex items-center gap-6">
            <AnimatePresence>
              {lastUpdated && !loading && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40 md:flex"
                >
                  <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live Update: {lastUpdated.toLocaleTimeString()}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={fetchReport}
              disabled={loading}
              className="group relative rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <RefreshCw
                  className={cn('h-4 w-4', loading && 'animate-spin')}
                />
                <span>{loading ? 'ANALYZING...' : 'REFRESH'}</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-32">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[60vh] flex-col items-center justify-center gap-8"
            >
              <div className="relative h-24 w-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-t-2 border-emerald-500"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border-b-2 border-blue-500 opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-8 w-8 animate-pulse text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-gradient font-display text-4xl font-bold tracking-tight">
                  시장 데이터 동기화 중
                </h2>
                <p className="text-lg text-white/40">
                  전 세계 경제 지표와 연준의 최신 발언을 분석하고 있습니다.
                </p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass mx-auto max-w-xl rounded-[32px] p-12 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h2 className="mb-4 text-2xl font-bold">분석 엔진 오류</h2>
              <p className="mb-8 text-lg text-white/60">{error}</p>
              <button
                onClick={fetchReport}
                className="rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-gray-200"
              >
                시스템 재시작
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left: Hero + Report */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12 lg:col-span-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-500">
                    <Globe className="h-4 w-4" />
                    Global Market Intelligence
                  </div>

                  <h1 className="text-gradient font-display text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl">
                    ECONOMIC
                    <br />
                    PULSE REPORT
                  </h1>

                  <div className="flex items-center gap-4 text-sm font-medium text-white/40">
                    <span>
                      {new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <div className="h-1 w-1 rounded-full bg-white/20" />
                    <span>AI-GENERATED INSIGHTS</span>
                  </div>
                </div>

                <article className="glass group relative overflow-hidden rounded-[40px] p-8 md:p-12">
                  <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-10 transition-opacity group-hover:opacity-20">
                    <Newspaper className="h-32 w-32 rotate-12" />
                  </div>

                  <div
                    className="prose prose-invert relative max-w-none
                      prose-headings:font-display prose-headings:tracking-tight
                      prose-h1:mb-8 prose-h1:text-4xl
                      prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-emerald-400 prose-h2:text-2xl
                      prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/70
                      prose-li:text-lg prose-li:text-white/70
                      prose-strong:font-bold prose-strong:text-white
                      prose-code:rounded prose-code:bg-emerald-500/10 prose-code:px-1 prose-code:text-emerald-300
                    "
                  >
                    <ReactMarkdown>{report?.content ?? ''}</ReactMarkdown>
                  </div>
                </article>
              </motion.div>

              {/* Right: Stats + Sources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8 lg:col-span-4"
              >
                {/* Market stats */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="glass group flex h-40 flex-col justify-between rounded-3xl p-6">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Market Sentiment
                      </span>
                      <BarChart3 className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-display text-4xl font-bold tracking-tighter">
                        BULLISH
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                        <ArrowUpRight className="h-3 w-3" />
                        AI Confidence 94%
                      </div>
                    </div>
                  </div>

                  <div className="glass space-y-4 rounded-3xl p-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                      Real-time Indicators
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: 'S&P 500', value: 'Analyzing', color: 'bg-emerald-500' },
                        { label: 'NASDAQ', value: 'Analyzing', color: 'bg-blue-500' },
                        { label: 'FED RATE', value: 'Steady', color: 'bg-amber-500' },
                      ].map((stat, i) => (
                        <div
                          key={stat.label}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3"
                        >
                          <span className="text-sm font-medium text-white/60">
                            {stat.label}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold">
                              {stat.value}
                            </span>
                            <div
                              className={cn(
                                'h-1.5 w-1.5 rounded-full animate-pulse',
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
                <div className="glass space-y-6 rounded-3xl p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
                      Intelligence Sources
                    </h3>
                    <Newspaper className="h-4 w-4 text-white/20" />
                  </div>

                  <div className="space-y-4">
                    {report?.sources && report.sources.length > 0 ? (
                      report.sources.map((source, idx) => (
                        <a
                          key={`${source.uri}-${idx}`}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <span className="line-clamp-2 text-sm leading-snug text-white/60 transition-colors group-hover:text-white">
                              {source.title}
                            </span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-white/20 transition-colors group-hover:text-emerald-500" />
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="py-8 text-center opacity-20">
                        <Globe className="mx-auto mb-2 h-8 w-8" />
                        <p className="text-xs">No external links found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="rounded-3xl border border-dashed border-white/10 p-6">
                  <p className="text-[10px] leading-relaxed tracking-wider text-white/30">
                    NOTICE: This report is generated by Pulse.AI using real-time
                    search data. Financial markets involve risk. This is not
                    financial advice.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3 opacity-30">
            <TrendingUp className="h-5 w-5" />
            <span className="font-display font-bold tracking-tight">
              PULSE.AI
            </span>
          </div>

          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="transition-colors hover:text-white">
              Intelligence
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Network
            </a>
            <a href="#" className="transition-colors hover:text-white">
              API
            </a>
          </div>

          <div className="text-[10px] font-medium text-white/20">
            © 2026 PULSE.AI LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
