'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight, Check, ChevronDown, CircleHelp, Code2, Copy, Download, FileText, GraduationCap, Layers3, LockKeyhole, MessageSquareText, PanelRightClose, PenLine, Plus, RotateCcw, ShieldCheck, Sparkles, X } from 'lucide-react';
import { SOURCE_URL, STORAGE_KEY, STEP_NAMES, defaults, categories, detectCategory, branchInfo, validateStep, buildSections, buildPrompt, restoreSession } from '@/lib/prompt-engine.mjs';
type Answers = ReturnType<typeof defaults>;
const icons = [FileText, GraduationCap, Code2, PenLine];
const questions = ['어떤 프롬프트를 만들고 싶으신가요?', '누구를 위한 결과물인가요?', '어떤 배경을 알면 도움이 될까요?', '', '어떤 모습으로 받아보고 싶으신가요?', '지켜야 할 조건이 있나요?', '마음에 드는 예시가 있나요?'];
const hints = ['원하는 작업과 결과를 편하게 적어 주세요. 답변에 맞춰 다음 질문을 준비합니다.', '독자의 수준과 상황을 알면, 설명의 깊이와 표현을 맞출 수 있어요.', '참고 자료, 기존 내용, 현재 상황을 붙여 넣어 주세요. 없다면 건너뛰어도 좋아요.', '', '형식, 어조, 분량을 정하면 원하는 결과에 더 가까워집니다.', '꼭 지킬 조건과 제외할 내용을 적어 주세요. 없다면 건너뛰어도 좋아요.', '원하는 문체나 입력·출력 예시를 추가하면 결과의 일관성이 좋아집니다.'];
const keys = ['goal','audience','context','details','','constraints','examples'] as const;
const placeholders = ['예: AI 초보 직장인을 위한 2시간 분량의 ChatGPT 활용 강의자료를 만들고 싶습니다.', '예: AI를 처음 사용하는 40~60대 직장인. 이메일과 문서 작성에 활용하려고 합니다.', '예: 수업은 오프라인으로 진행하며, 참가자들은 개인 노트북을 가져옵니다.\n\n참고 자료가 있다면 여기에 붙여 넣어 주세요.', '', '', '예: 과장된 표현과 어려운 전문용어는 피하고, 비용이 드는 도구는 제외해 주세요.', '예: 입력 — 회의 메모\n출력 — 결정 사항 / 담당자 / 마감일 순서의 표'];
const labels = ['만들고 싶은 프롬프트','대상과 이해 수준','배경 또는 참고 자료','세부 요구사항','','추가 조건','원하는 결과의 예시'];
const outputs = [
  ['format','출력 형식',['제목과 소제목이 있는 문서','표와 핵심 요약','단계별 가이드와 체크리스트','실행 가능한 코드와 사용법','자연스러운 서술형','JSON 객체']],
  ['tone','어조',['전문적이고 친근하게','쉽고 친절하게','간결하고 명확하게','격식 있고 객관적으로','따뜻하고 생동감 있게']],
  ['language','출력 언어',['한국어','영어','한국어와 영어']],
  ['length','분량',['필요한 만큼 간결하게','500자 내외','1,000~1,500자','2,000~3,000자','상세하게, 분량 제한 없음']],
] as const;
export default function Home() {
  const [answers,setAnswers]=useState<Answers>(defaults);
  const [step,setStep]=useState(0), [reached,setReached]=useState(0), [generated,setGenerated]=useState(false);
  const [ready,setReady]=useState(false), [saved,setSaved]=useState('이 기기에 자동 저장');
  const [error,setError]=useState(''), [notice,setNotice]=useState('');
  const [modal,setModal]=useState<'guide'|'reset'|null>(null);
  const [tab,setTab]=useState<'preview'|'raw'>('preview'), [manual,setManual]=useState<string|null>(null);
  const [editing,setEditing]=useState(false), [copied,setCopied]=useState(false);
  const questionRef=useRef<HTMLHeadingElement>(null), closeRef=useRef<HTMLButtonElement>(null), lastFocus=useRef<HTMLElement|null>(null);
  const category=detectCategory(answers.goal,answers.category) as keyof typeof branchInfo;
  const branch=branchInfo[category], sections=buildSections(answers,!generated);
  const finalPrompt=manual??buildPrompt(answers), completed=generated?7:Math.min(reached,7);
  useEffect(()=>{
    try {const s=restoreSession(localStorage.getItem(STORAGE_KEY)||'');if(s){setAnswers(s.answers);setStep(s.step);setReached(s.reached);setGenerated(s.generated);setManual(s.manual);if(s.reached>0||s.answers.goal)setNotice('지난 작업을 이어서 불러왔습니다.');}}
    catch{setSaved('이 브라우저에서 저장 불가');}setReady(true);
  },[]);
  useEffect(()=>{
    if(!ready)return;const t=setTimeout(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,answers,step,reached,generated,manual}));setSaved('이 기기에 저장됨');}catch{setSaved('저장 공간을 확인해 주세요');}},350);return()=>clearTimeout(t);
  },[answers,step,reached,generated,manual,ready]);
  useEffect(()=>{if(notice){const t=setTimeout(()=>setNotice(''),4000);return()=>clearTimeout(t);}},[notice]);
  useEffect(()=>{
    if(!modal)return;lastFocus.current=document.activeElement as HTMLElement;closeRef.current?.focus();
    const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')setModal(null);if(e.key==='Tab'){const nodes=Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"] button, [role="dialog"] a'));const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};
    const old=document.body.style.overflow;document.body.style.overflow='hidden';document.addEventListener('keydown',fn);
    return()=>{document.removeEventListener('keydown',fn);document.body.style.overflow=old;lastFocus.current?.focus();};
  },[modal]);
  function update<K extends keyof Answers>(key:K,value:Answers[K]){setAnswers(p=>({...p,[key]:value,...(key==='goal'?{category:'auto'}:{})}));setError('');setManual(null);setCopied(false);if(generated)setGenerated(false);}
  function go(index:number){setStep(index);setError('');setEditing(false);setTimeout(()=>questionRef.current?.focus(),0);}
  function advance(){const err=validateStep(step,answers);if(err){setError(err);document.getElementById('answer')?.focus();return;}if(step===6||reached===7){for(let i=0;i<7;i++){const e=validateStep(i,answers);if(e){go(i);setError(e);return;}}setGenerated(true);setReached(7);setStep(7);setEditing(false);setManual(null);setNotice('프롬프트가 완성되었습니다.');}else{setReached(Math.max(reached,step+1));go(step+1);}}
  async function copyPrompt(){if(!finalPrompt.trim()){setNotice('복사할 프롬프트를 입력해 주세요.');return;}try{let ok=false;if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(finalPrompt);ok=true;}catch{}}if(!ok){const el=document.createElement('textarea');el.value=finalPrompt;el.style.position='fixed';el.style.opacity='0';document.body.appendChild(el);el.select();ok=document.execCommand('copy');el.remove();}if(!ok)throw new Error('copy');setCopied(true);setNotice('프롬프트를 복사했습니다.');setTimeout(()=>setCopied(false),2500);}catch{setTab('raw');setNotice('복사 권한이 없습니다. 원문을 선택해 직접 복사해 주세요.');}}
  function download(){const url=URL.createObjectURL(new Blob([finalPrompt],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='my-prompt.md';a.click();URL.revokeObjectURL(url);setNotice('프롬프트 파일을 다운로드했습니다.');}
  function reset(){setAnswers(defaults());setStep(0);setReached(0);setGenerated(false);setManual(null);setEditing(false);setError('');setModal(null);setNotice('새 프롬프트를 시작합니다.');}
  return <div className="app-shell">
    <aside className="sidebar">
      <a href="/" className="brand" aria-label="Prompt Studio 홈"><span className="brand-mark"><Layers3 size={22}/></span><span>prompt<span className="brand-light">studio</span><small>작은 질문, 선명한 결과</small></span></a>
      <div className="sidebar-label">WORKSPACE</div>
      <button className="sidebar-item active" onClick={()=>go(generated?7:Math.min(step,6))}><MessageSquareText size={18}/>프롬프트 만들기<span className="tiny-dot"/></button>
      <button className="sidebar-item" onClick={()=>setModal('guide')}><CircleHelp size={18}/>프롬프팅 가이드<ArrowUpRight size={14} className="push"/></button>
      <div className="steps-heading">만들어 가는 순서 <span>{completed}/7</span></div>
      <nav aria-label="질문 진행 단계" className="steps-nav">{STEP_NAMES.map((name:string,i:number)=><button key={name} disabled={i>reached} onClick={()=>go(i)} className={`step-link ${i===step?'current':''} ${i<reached?'done':''}`} aria-current={i===step?'step':undefined}><span className="step-dot">{i<reached?<Check size={12}/>:String(i+1).padStart(2,'0')}</span>{name}{i===step&&<span className="step-pulse"/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="private-box"><ShieldCheck size={19}/><div>나만의 작업 공간<p>비공개로 사용하는 스튜디오</p></div></div><div className="user-line"><span className="avatar">J</span><span>조원님의 스튜디오<small>PERSONAL WORKSPACE</small></span><LockKeyhole size={13}/></div></div>
    </aside>
    <div className="page-area">
      <header className="topbar"><div className="breadcrumb">워크스페이스 <span>/</span><strong>프롬프트 생성기</strong></div><div className="top-actions"><span className="private-badge"><LockKeyhole size={12}/>비공개</span><button className="new-button" onClick={()=>setModal('reset')}><Plus size={15}/>새로 만들기</button></div></header>
      <main>
        <section className="hero"><div><div className="eyebrow"><span/>THINK CLEARLY. PROMPT BETTER.</div><h1>좋은 프롬프트는,<br/>좋은 <span>질문</span>에서.</h1><p>막막한 생각을 명확한 요청으로.<br className="mobile-break"/> 질문에 답하며 나만의 프롬프트를 완성해 보세요.</p></div><button className="guide-chip" onClick={()=>setModal('guide')}><span className="gemini-star">✦</span><span>Gemini 프롬프팅 전략 기반<small>명확한 지시 · 충분한 맥락 · 일관된 형식</small></span><ArrowUpRight size={17}/></button></section>
        <div className="mobile-progress"><span>{step===7?'프롬프트 완성':`${step+1}번째 질문`}</span><select aria-label="질문 단계 이동" value={step} onChange={e=>go(Number(e.target.value))}>{STEP_NAMES.map((s:string,i:number)=><option key={s} value={i} disabled={i>reached}>{i+1}. {s}</option>)}{reached===7&&<option value={7}>완성된 프롬프트</option>}</select></div>
        <div className="workbench">
          <section className="question-panel" aria-labelledby="question-title">
            <div className="panel-top"><div><span className="panel-icon"><MessageSquareText size={16}/></span><strong>질문에 답하기</strong></div><span className="step-count">{step===7?'COMPLETE':`STEP ${String(step+1).padStart(2,'0')}`}<span> / 07</span></span></div>
            <div className="progress-track" role="progressbar" aria-label="질문 완료율" aria-valuemin={0} aria-valuemax={7} aria-valuenow={completed}><div style={{width:`${completed/7*100}%`}}/></div>
            {step<7?<div className="question-body">
              <div className="question-meta"><span className="question-number">QUESTION {String(step+1).padStart(2,'0')}</span><span className={[0,1,3].includes(step)?'required':'optional'}>{[0,1,3].includes(step)?'필수 질문':step===4?'출력 설정':'선택 질문'}</span></div>
              <h2 id="question-title" ref={questionRef} tabIndex={-1}>{step===3?branch.title:questions[step]}</h2><p className="question-hint" id="answer-hint">{step===3?branch.hint:hints[step]}</p>
              {step===0&&<><div className="input-label">어디서부터 시작할까요?<span>예시를 골라도 좋아요</span></div><div className="category-grid">{categories.map((c:{id:string;label:string;sample:string},i:number)=>{const Icon=icons[i];return <button className={answers.category===c.id?'selected':''} key={c.id} onClick={()=>{setAnswers(p=>({...p,category:c.id,goal:c.sample}));setManual(null);setGenerated(false);setError('');}}><Icon size={17}/>{c.label}<ArrowUpRight size={13}/></button>;})}</div></>}
              {step!==4&&<label className={`input-label ${step===0?'goal-label':''}`} htmlFor="answer">{labels[step]}</label>}
              {step===4?<div className="output-fields">{outputs.map(([key,label,options])=><label key={key}>{label}<div className="select-wrap"><select aria-label={label} value={answers[key]} onChange={e=>update(key,e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select><ChevronDown size={15}/></div></label>)}<div className="format-note"><FileText size={17}/><span>선택한 형식은 프롬프트에 바로 반영됩니다.<br/>세부 조건은 다음 질문에서 더할 수 있어요.</span></div></div>:<><div className={`textarea-wrap ${error?'invalid':''}`}><textarea id="answer" aria-describedby={`answer-hint${error?' answer-error':''}`} aria-invalid={!!error} maxLength={12000} value={answers[keys[step] as keyof Answers] as string} onChange={e=>update(keys[step] as keyof Answers,e.target.value)} placeholder={step===3?branch.placeholder:placeholders[step]} onKeyDown={e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();advance();}}}/><span className="char-count">{String(answers[keys[step] as keyof Answers]||'').length.toLocaleString()} / 12,000</span></div>{step===1&&<div className="suggestions">{['AI 초보 직장인','시니어 학습자','일반 독자','개발자'].map(t=><button key={t} onClick={()=>update('audience',t)}>{t}<Plus size={11}/></button>)}</div>}</>}
              {step===5&&<label className="checkbox-row"><input type="checkbox" checked={answers.sources} onChange={e=>update('sources',e.target.checked)}/><span>최신 정보 확인과 출처 표기를 요청할게요<small>실행하는 AI의 검색 지원 여부에 따라 달라집니다.</small></span></label>}
              {step===6&&<div className="tip-box"><Sparkles size={16}/><div>예시는 작지만 강력해요<p>짧은 입력과 기대 출력 한 쌍으로도 원하는 스타일을 전달할 수 있습니다.</p></div></div>}
              {error&&<p className="error" id="answer-error" role="alert">{error}</p>}
              <div className="question-footer"><button className="back-button" onClick={()=>go(step-1)} disabled={step===0}><ArrowLeft size={15}/>이전</button><span className="keyboard-hint">Ctrl + Enter로 계속</span><button className="primary-button" onClick={advance}>{reached===7?<><Check size={16}/>변경사항 적용</>:step===6?<><Sparkles size={16}/>프롬프트 완성</>:<>다음 질문<ArrowRight size={16}/></>}</button></div>
              {[2,5,6].includes(step)&&<button className="skip-button" onClick={()=>{update(keys[step] as keyof Answers,'');advance();}}>이번 질문은 건너뛰기</button>}
              {step>0&&<div className="route-note"><Check size={13}/><span><b>{branch.label}</b> 목적에 맞춘 질문을 진행하고 있어요.</span></div>}
            </div>:<div className="completion-body"><div className="completion-mark"><Check size={28}/></div><span className="question-number">READY TO CREATE</span><h2 id="question-title" ref={questionRef} tabIndex={-1}>생각이 프롬프트가 되었어요.</h2><p>7개의 질문을 바탕으로 작업에 필요한 지시를 정리했습니다. 복사해서 원하는 AI에 붙여 넣어 보세요.</p><div className="answer-summary">{STEP_NAMES.map((name:string,i:number)=><button key={name} onClick={()=>go(i)}><span><Check size={13}/>{name}</span><span>{i===4?answers.format:(answers[keys[i] as keyof Answers]?'입력 완료':'생략')}<PenLine size={13}/></span></button>)}</div><button className="primary-button wide" onClick={copyPrompt}>{copied?<Check size={17}/>:<Copy size={17}/>}프롬프트 복사하기</button><p className="completion-tip">답변을 수정하면 미리보기도 함께 바뀝니다.</p></div>}
          </section>
          <section className={`preview-panel ${generated?'finished':''}`} aria-label="프롬프트 미리보기">
            <div className="panel-top"><div><span className="panel-icon"><FileText size={16}/></span><strong>프롬프트 미리보기</strong><span className="live-badge"><i/>{generated?'완성':'LIVE'}</span></div><button className="icon-button" onClick={()=>setTab(tab==='raw'?'preview':'raw')} title="보기 방식 전환" aria-label="보기 방식 전환"><PanelRightClose size={17}/></button></div>
            <div className="preview-toolbar"><div className="tabs"><button className={tab==='preview'?'chosen':''} onClick={()=>{setTab('preview');setEditing(false);}}>미리보기</button><button className={tab==='raw'?'chosen':''} onClick={()=>setTab('raw')}>원문</button></div><span>MARKDOWN</span></div>
            <div className="preview-document">{!answers.goal&&!generated&&<div className="preview-intro"><span><Sparkles size={16}/></span><div>생각을 채우면, 프롬프트가 완성됩니다.<p>왼쪽 질문에 답하면 여기에 바로 반영돼요.</p></div></div>}
              {editing?<textarea aria-label="최종 프롬프트 직접 편집" className="raw-editor" value={manual??buildPrompt(answers)} maxLength={60000} onChange={e=>setManual(e.target.value)}/>:tab==='raw'?<pre className="raw-view" tabIndex={0}>{manual??buildPrompt(answers)}</pre>:manual!==null?<pre className="raw-view">{manual}</pre>:<div className="document-content">{sections.map((s:{title:string;body:string},i:number)=><div className={`document-section ${!generated&&((i===1&&!answers.goal)||(i===2&&!answers.audience)||(i===5&&!answers.details))?'placeholder-section':''}`} key={s.title}><h3><span>#</span>{s.title}</h3><p>{s.body}</p></div>)}</div>}
            </div>
            <div className="preview-bottom"><div className="preview-status"><span className={generated?'green-dot':'neutral-dot'}/>{generated?'바로 사용할 수 있어요':`작성 중 · ${completed}/7 단계 완료`}<span className="prompt-length">{finalPrompt.length.toLocaleString()}자</span></div><div className="preview-actions"><button className="secondary-button" onClick={()=>{setEditing(!editing);setTab('raw');}} disabled={!generated}>{editing?<Check size={14}/>:<PenLine size={14}/>}<span>{editing?'편집 완료':'직접 편집'}</span></button><button className="icon-button download-button" onClick={download} disabled={!generated} title="Markdown 다운로드" aria-label="Markdown 다운로드"><Download size={17}/></button><button className="copy-button" disabled={!generated} onClick={copyPrompt}>{copied?<Check size={15}/>:<Copy size={15}/>}<span>{copied?'복사 완료':'프롬프트 복사'}</span></button></div></div>
          </section>
        </div>
        <footer className="page-footer"><span><span className="save-dot"/>{saved}</span><button onClick={()=>setModal('guide')}>좋은 프롬프트를 만드는 5가지 원칙<ArrowUpRight size={13}/></button></footer><div className="bottom-note"><Sparkles size={13}/>생각을 대신하지 않고, 생각을 더 선명하게.</div>
      </main>
    </div>
    {notice&&<div className="toast" role="status"><Check size={16}/>{notice}</div>}
    {modal&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button ref={closeRef} className="modal-close icon-button" onClick={()=>setModal(null)} aria-label="닫기"><X size={20}/></button>{modal==='guide'?<><span className="modal-eyebrow">THE METHOD BEHIND THE PROMPT</span><h2 id="modal-title">좋은 프롬프트의 5가지 원칙</h2><p>Google의 Gemini 프롬프팅 전략 문서를 우선 참고해 질문과 생성 구조를 설계했습니다.</p><ol className="principles">{[['명확한 지시','목적과 꼭 필요한 요구사항을 구체적으로 적습니다.'],['충분한 맥락','대상, 배경, 참고 자료를 제공해 추측을 줄입니다.'],['일관된 출력 형식','형식·언어·어조·분량을 미리 정합니다.'],['원하는 결과의 예시','짧은 입력·출력 예시로 스타일과 패턴을 전달합니다.'],['반복해서 다듬기','미리보고 답변을 수정한 뒤 실제 결과에 맞게 개선합니다.']].map(([t,d],i)=><li key={t}><span>0{i+1}</span><div><strong>{t}</strong><p>{d}</p></div></li>)}</ol><a className="source-link" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">Gemini 공식 문서 보기<ArrowUpRight size={16}/></a><div className="guide-footnote">문서 확인: 2026.11.08 · 문서 변경은 자동 반영되지 않습니다.<br/>이 앱은 답변을 규칙에 따라 구조화합니다. AI 모델의 답변을 생성하거나 실행하지 않습니다. 입력은 이 기기의 브라우저에 저장됩니다.</div></>:<><div className="reset-icon"><RotateCcw size={24}/></div><h2 id="modal-title">새 프롬프트를 시작할까요?</h2><p>현재 답변과 저장된 초안이 초기화됩니다. 완성한 프롬프트가 있다면 먼저 복사하거나 다운로드해 주세요.</p><div className="reset-actions"><button className="secondary-button" onClick={()=>setModal(null)}>계속 작성하기</button><button className="primary-button" onClick={reset}>새로 시작하기<ArrowRight size={15}/></button></div></>}</section></div>}
  </div>;
}
