'use client';

import * as React from 'react';
import { ExternalLink } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  title: string;
  links: ExternalLink[];
}

export function Footer({ title, links }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              생성형 AI와 웹 기술의 만남 — 창작과 코드의 기록
            </p>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label={link.label}
              >
                {link.name} ↗
              </a>
            ))}

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 transition-all"
              aria-label="페이지 맨 위로 이동"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-400 dark:text-slate-500">
          © {currentYear} {title}. All rights reserved. Built with Next.js, TypeScript & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
