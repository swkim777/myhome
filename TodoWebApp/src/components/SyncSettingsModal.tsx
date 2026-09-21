/**
 * @file SyncSettingsModal.tsx
 * @description 구글 스프레드시트(1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f) 연동 및 Apps Script URL 설정 모달
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, AlertCircle, RefreshCw, HelpCircle, Save } from 'lucide-react';
import { 
  SPREADSHEET_ID, 
  SPREADSHEET_URL, 
  DRIVE_FOLDER_ID,
  getAppsScriptUrl, 
  setAppsScriptUrl, 
  testAppsScriptConnection 
} from '../services/googleSheets';
import { useTodo } from '../context/TodoContext';

interface SyncSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncSettingsModal: React.FC<SyncSettingsModalProps> = ({ isOpen, onClose }) => {
  const { refreshFromSheet, syncAllToSheet, isSyncing, syncStatus } = useTodo();
  const [url, setUrl] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUrl(getAppsScriptUrl());
      setTestResult(null);
    }
  }, [isOpen]);

  const handleSave = () => {
    setAppsScriptUrl(url);
    setTestResult({ success: true, message: 'Google Apps Script URL이 저장되었습니다.' });
    if (url.trim()) {
      refreshFromSheet();
    }
  };

  const handleTest = async () => {
    if (!url.trim()) {
      setTestResult({ success: false, message: 'Apps Script 배포 URL을 입력해 주세요.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    const res = await testAppsScriptConnection(url);
    setTestResult(res);
    setTesting(false);
  };

  const handleManualPull = async () => {
    await refreshFromSheet();
    setTestResult({ success: true, message: '구글 시트로부터 최신 일정을 성공적으로 불러왔습니다.' });
  };

  const handleManualPush = async () => {
    const success = await syncAllToSheet();
    if (success) {
      setTestResult({ success: true, message: '현재 로컬의 모든 일정을 구글 시트로 업로드 완료했습니다.' });
    } else {
      setTestResult({ success: false, message: '구글 시트 업로드에 실패했습니다. URL을 확인해 주세요.' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                  📊
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">구글 시트 동기화 설정</h3>
                  <p className="text-xs text-slate-500">PC와 모바일 간 실시간 일정 동기화</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="닫기"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm">
              {/* Target Resources Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Google Drive Folder */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-0.5">연동 구글 드라이브 폴더</span>
                    <p className="font-mono text-xs text-slate-700 font-semibold break-all">{DRIVE_FOLDER_ID}</p>
                    <p className="text-[11px] text-slate-500 mt-1">todos.csv 자동 로드 및 저장</p>
                  </div>
                  <a
                    href={`https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-white text-indigo-600 text-xs font-semibold shadow-sm border border-indigo-200 hover:bg-indigo-50 transition-colors shrink-0"
                  >
                    <span>폴더 열기</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                {/* Target Sheet Info */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">연동 구글 스프레드시트</span>
                    <p className="font-mono text-xs text-slate-700 font-semibold break-all">{SPREADSHEET_ID}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Todos 시트 데이터베이스</p>
                  </div>
                  <a
                    href={SPREADSHEET_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-white text-blue-600 text-xs font-semibold shadow-sm border border-blue-200 hover:bg-blue-50 transition-colors shrink-0"
                  >
                    <span>시트 열기</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-semibold text-slate-600">현재 연동 상태:</span>
                <div className="flex items-center space-x-1.5">
                  {syncStatus === 'synced' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      <CheckCircle2 size={13} />
                      <span>연동 완료 (동기화 활성화)</span>
                    </span>
                  )}
                  {syncStatus === 'syncing' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      <RefreshCw size={13} className="animate-spin" />
                      <span>동기화 중...</span>
                    </span>
                  )}
                  {syncStatus === 'idle' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                      <AlertCircle size={13} />
                      <span>로컬 전용 (URL 미설정)</span>
                    </span>
                  )}
                  {syncStatus === 'error' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                      <AlertCircle size={13} />
                      <span>통신 오류</span>
                    </span>
                  )}
                </div>
              </div>

              {/* URL Input Form */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Google Apps Script 웹 앱 URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs text-slate-800"
                  />
                  <button
                    onClick={handleTest}
                    disabled={testing || !url.trim()}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50 shrink-0"
                  >
                    {testing ? '확인 중...' : '연결 테스트'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  구글 스프레드시트의 Apps Script에서 배포한 웹 앱 URL을 입력하세요.
                </p>
              </div>

              {/* Test Result Message */}
              {testResult && (
                <div className={`p-3.5 rounded-xl text-xs flex items-start space-x-2 ${
                  testResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'
                }`}>
                  {testResult.success ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" /> : <AlertCircle size={16} className="shrink-0 mt-0.5" />}
                  <span className="leading-relaxed">{testResult.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={handleManualPull}
                  disabled={isSyncing || !url.trim()}
                  className="flex-1 min-w-[140px] flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                  <span>시트에서 일정 가져오기</span>
                </button>
                <button
                  onClick={handleManualPush}
                  disabled={isSyncing || !url.trim()}
                  className="flex-1 min-w-[140px] flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  <Save size={13} />
                  <span>현재 일정 시트에 덮어쓰기</span>
                </button>
              </div>

              {/* Guide Accordion */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors py-1"
                >
                  <div className="flex items-center space-x-1.5">
                    <HelpCircle size={14} />
                    <span>배포 가이드 (Apps Script 처음 연동하기)</span>
                  </div>
                  <span>{showGuide ? '접기 ▲' : '열기 ▼'}</span>
                </button>

                {showGuide && (
                  <div className="mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-xs text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800">📌 3분 완료 배포 순서:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                      <li>
                        상단의 <strong>[시트 열기]</strong>를 눌러 구글 스프레드시트로 이동합니다.
                      </li>
                      <li>
                        상단 메뉴의 <strong>[확장 프로그램] &gt; [Apps Script]</strong>를 클릭합니다.
                      </li>
                      <li>
                        프로젝트 폴더 내의 <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">google-apps-script.js</code> 코드를 복사하여 붙여넣고 저장합니다.
                      </li>
                      <li>
                        우측 상단 <strong>[배포] &gt; [새 배포]</strong>를 클릭하고 유형으로 <strong>[웹 앱]</strong>을 선택합니다.
                      </li>
                      <li>
                        <strong>다음 사용자 권한으로 실행:</strong> <span className="text-blue-600 font-semibold">나(내 계정)</span>, <strong>액세스 권한:</strong> <span className="text-rose-600 font-semibold">모든 사용자(Anyone)</span>로 설정 후 배포합니다.
                      </li>
                      <li>
                        발급된 <strong>웹 앱 URL</strong>을 복사하여 위 입력창에 붙여넣고 저장하면 완료됩니다!
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50 space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
              >
                닫기
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                설정 저장
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
