/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { generateEconomicBlog } from './services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Loader2, TrendingUp, Newspaper, BarChart3, Lightbulb, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateEconomicBlog();
      setContent(result.text);
      setSources(result.sources);
    } catch (err) {
      setError('뉴스를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Economic Insights</h1>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-sm"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {loading ? '분석 중...' : '최신 뉴스 분석'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!content && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-6">
                <Newspaper size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4 tracking-tight">오늘의 미국 경제를 분석하세요</h2>
              <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                최근 24시간 이내의 연준 금리 동향, 나스닥 기술주 흐름, 주요 경제 지표를 실시간으로 검색하여 블로그 포스트를 생성합니다.
              </p>
              <button
                onClick={handleGenerate}
                className="mt-8 bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-all"
              >
                지금 시작하기
              </button>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-6"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium animate-pulse">실시간 경제 뉴스를 검색하고 있습니다...</p>
                <p className="text-sm text-gray-400 mt-2">연준 발언, 나스닥 지수, 거시 경제 지표를 분석 중입니다.</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center"
            >
              {error}
            </motion.div>
          )}

          {content && !loading && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-black/5 rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-6">
                  <BarChart3 size={16} />
                  <span>Market Analysis Report</span>
                </div>
                
                <div className="prose prose-zinc max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-8
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-100
                  prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-li:text-zinc-600 prose-li:mb-2
                  prose-strong:text-zinc-900
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:italic
                ">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>

                {sources.length > 0 && (
                  <div className="mt-16 pt-8 border-t border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Lightbulb size={14} />
                      참고 문헌 및 출처
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sources.map((source, idx) => (
                        source.web && (
                          <a
                            key={idx}
                            href={source.web.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors group"
                          >
                            <span className="text-sm text-zinc-600 truncate mr-4">{source.web.title || source.web.uri}</span>
                            <ExternalLink size={14} className="text-zinc-400 group-hover:text-emerald-600 flex-shrink-0" />
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-zinc-50 p-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Gemini AI Analyst</p>
                    <p className="text-xs text-zinc-400">실시간 데이터 기반 분석 보고서</p>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2 border border-zinc-200 rounded-full text-sm font-medium hover:bg-white transition-all shadow-sm"
                >
                  PDF로 저장하기
                </button>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 text-center text-zinc-400 text-sm border-t border-zinc-100 mt-12">
        <p>© 2026 Economic Insights. Powered by Gemini AI Grounding.</p>
        <p className="mt-2">투자 결정에 대한 책임은 투자자 본인에게 있으며, 본 서비스는 정보 제공만을 목적으로 합니다.</p>
      </footer>
    </div>
  );
}
