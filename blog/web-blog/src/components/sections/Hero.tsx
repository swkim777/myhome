import * as React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  role: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
}

export function Hero({ role, headline, subheadline, primaryCtaText }: HeroProps) {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
      {/* Subtle Ambient Background Highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Role Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase font-mono mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{role}</span>
        </div>

        {/* Main Display Headline (Jaspreet Singh inspired bold typography) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl leading-[1.12]">
          생성형 AI와 웹 기술의 만남, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            창작과 코드
          </span>
          의 기록
        </h1>

        {/* Subhead description */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          {subheadline}
        </p>

        {/* CTA Group */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#recent-works"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-base transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#profile"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 font-semibold text-base transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <span>운영자 소개 (Profile)</span>
          </a>
        </div>

        {/* 3 Pillars Overview Bar */}
        <div className="mt-16 sm:mt-24 w-full max-w-3xl grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800 py-6">
          <div className="px-4 text-center">
            <span className="block text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">Focus 01</span>
            <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mt-1 block">AI & 강의</span>
          </div>
          <div className="px-4 text-center">
            <span className="block text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">Focus 02</span>
            <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mt-1 block">웹 & 클라우드</span>
          </div>
          <div className="px-4 text-center">
            <span className="block text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">Focus 03</span>
            <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 mt-1 block">1인 미디어 창작</span>
          </div>
        </div>
      </div>
    </section>
  );
}
