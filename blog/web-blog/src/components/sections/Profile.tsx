'use client';

import * as React from 'react';
import { ProfileData } from '../../types';
import { UserCheck } from 'lucide-react';

interface ProfileProps {
  profile: ProfileData;
}

export function Profile({ profile }: ProfileProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <section id="profile" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            01 // PROFILE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12">
          운영자 소개 & 철학
        </h2>

        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Avatar Area with jowon.jpg */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-blue-500/30 dark:border-blue-400/30 bg-slate-100 dark:bg-slate-900 flex items-center justify-center shadow-lg">
              {!imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/assets/jowon.jpg"
                  alt={`${profile.name} 프로필 사진`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  onError={() => {
                    console.warn('Failed to load /assets/jowon.jpg, falling back to icon');
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                  <UserCheck className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  <span className="font-mono font-bold text-xl text-slate-800 dark:text-slate-200">
                    {profile.name}
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-5">
              {profile.name}
            </h3>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {profile.role}
            </p>
          </div>

          {/* Bio & Philosophy Area */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed border-l-4 border-blue-600 pl-4">
              &quot;{profile.bio}&quot;
            </p>

            <div className="space-y-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {profile.detailedBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Keywords & Skill Badges */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60">
              <span className="block text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">
                Core Domains & Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1.5 rounded-md font-mono text-xs font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
