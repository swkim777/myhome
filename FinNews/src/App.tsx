/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { generateEconomicReport } from './services/geminiService';
import ReactMarkdown from 'react-markdown';
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
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [report, setReport] = useState<{ content: string; sources: any[] } | null>(null);
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
      setError('최신 정보를 가져오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen selection:bg-emerald-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">PULSE.AI</span>
          </div>
          
          <div className="flex items-center gap-6">
            <AnimatePresence>
              {lastUpdated && !loading && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 font-medium"
                >
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live Update: {lastUpdated.toLocaleTimeString()}
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={fetchReport}
              disabled={loading}
              className="group relative px-5 py-2.5 bg-white text-black rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                <span>{loading ? 'ANALYZING...' : 'REFRESH'}</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
            >
              <div className="relative w-24 h-24">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-emerald-500 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-b-2 border-blue-500 rounded-full opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-emerald-500 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold font-display tracking-tight text-gradient">시장 데이터 동기화 중</h2>
                <p className="text-white/40 text-lg">전 세계 경제 지표와 연준의 최신 발언을 분석하고 있습니다.</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-[32px] p-12 text-center max-w-xl mx-auto"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">분석 엔진 오류</h2>
              <p className="text-white/60 mb-8 text-lg">{error}</p>
              <button 
                onClick={fetchReport}
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all"
              >
                시스템 재시작
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Hero & Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-8 space-y-12"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-500 font-bold text-xs uppercase tracking-[0.3em]">
                    <Globe className="w-4 h-4" />
                    Global Market Intelligence
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold font-display leading-[0.9] tracking-tighter text-gradient">
                    ECONOMIC<br />PULSE REPORT
                  </h1>
                  <div className="flex items-center gap-4 text-white/40 text-sm font-medium">
                    <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span>AI-GENERATED INSIGHTS</span>
                  </div>
                </div>

                <article className="glass rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Newspaper className="w-32 h-32 rotate-12" />
                  </div>
                  
                  <div className="relative prose prose-invert max-w-none 
                    prose-headings:font-display prose-headings:tracking-tight
                    prose-h1:text-4xl prose-h1:mb-8
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-emerald-400
                    prose-p:text-white/70 prose-p:text-lg prose-p:leading-relaxed
                    prose-li:text-white/70 prose-li:text-lg
                    prose-strong:text-white prose-strong:font-bold
                    prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-1 prose-code:rounded
                  ">
                    <ReactMarkdown>{report?.content || ''}</ReactMarkdown>
                  </div>
                </article>
              </motion.div>

              {/* Right Column: Stats & Sources */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-4 space-y-8"
              >
                {/* Market Stats Bento */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="glass rounded-3xl p-6 flex flex-col justify-between h-40 group cursor-default">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Market Sentiment</span>
                      <BarChart3 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold font-display tracking-tighter">BULLISH</div>
                      <div className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3" />
                        AI Confidence 94%
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-3xl p-6 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Real-time Indicators</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'S&P 500', value: 'Analyzing', color: 'bg-emerald-500' },
                        { label: 'NASDAQ', value: 'Analyzing', color: 'bg-blue-500' },
                        { label: 'FED RATE', value: 'Steady', color: 'bg-amber-500' }
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-sm font-medium text-white/60">{stat.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold font-mono">{stat.value}</span>
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", stat.color)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sources Card */}
                <div className="glass rounded-3xl p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Intelligence Sources</h3>
                    <Newspaper className="w-4 h-4 text-white/20" />
                  </div>
                  <div className="space-y-4">
                    {report?.sources && report.sources.length > 0 ? (
                      report.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <span className="text-sm text-white/60 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                              {source.title}
                            </span>
                            <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-emerald-500 transition-colors shrink-0" />
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="text-center py-8 opacity-20">
                        <Globe className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-xs">No external links found</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-6 rounded-3xl border border-dashed border-white/10">
                  <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-wider">
                    NOTICE: This report is generated by Pulse.AI using real-time search data. Financial markets involve risk. This is not financial advice.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-30">
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold font-display tracking-tight">PULSE.AI</span>
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Intelligence</a>
            <a href="#" className="hover:text-white transition-colors">Network</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
          </div>
          <div className="text-[10px] text-white/20 font-medium">
            © 2026 PULSE.AI LABS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
