import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Users, 
  Palette, 
  BookOpen, 
  User, 
  UserCheck,
  GraduationCap, 
  Box, 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  X,
  FileText,
  Presentation,
  FileUp,
  File,
  Trash2
} from 'lucide-react';

// 독자 대상 목록
const AUDIENCE_OPTIONS = [
  {
    id: 'general_public',
    title: '일반 대중(20세 이상)',
    desc: '직관적 전달, 비유와 사례, 공감대 중심 전개',
    icon: User,
    buttonText: '슬라이드 프롬프트 생성',
    promptTone: '20대 이상의 일반 성인 대중을 대상으로 하는 직관적이고 설득력 있는 프레젠테이션 스토리라인과 명확한 슬라이드 메시지 구성'
  },
  {
    id: 'early_elem',
    title: '초등 저학년 (6~9세)',
    desc: '교훈적 기승전결, 공감 위주',
    icon: UserCheck,
    buttonText: '어린이 슬라이드 생성',
    promptTone: '초등 저학년 대상의 쉽고 친근한 시각 자료 중심 슬라이드 교육 가이드'
  },
  {
    id: 'late_elem',
    title: '초등 고학년 (10~15세)',
    desc: '심리 묘사, 비유와 상징 활용',
    icon: Users,
    buttonText: '청소년 슬라이드 생성',
    promptTone: '청소년 눈높이에 맞춘 호기심 자극형 개념 설명 및 시각화 슬라이드'
  },
  {
    id: 'academic',
    title: '대학생(원)',
    desc: '전문적 지식, 연구 배경 및 학술적 전개',
    icon: GraduationCap,
    buttonText: '학술적 가이드 생성',
    promptTone: '대학 및 대학원 수준의 전문 지식, 개념적 메커니즘, 학술적 엄밀성을 직관적으로 시각화하는 학술 발표 슬라이드'
  }
];

// 삽화 스타일 목록
const STYLE_OPTIONS = [
  {
    id: 'watercolor',
    title: '수채화 및 파스텔풍',
    desc: '따뜻하고 서정적인 느낌',
    promptKeyword: 'Soft pastel and watercolor illustration, delicate brush strokes, warm and dreamy atmosphere, high aesthetic quality'
  },
  {
    id: '3d_animation',
    title: '3D 애니메이션풍',
    desc: '선명하고 역동적인 입체감',
    promptKeyword: 'Vibrant 3D Pixar/Disney style CGI animation, volumetric lighting, rich textures, expressive characters'
  },
  {
    id: 'flat_design',
    title: '플랫 디자인',
    desc: '깔끔한 정보 전달 및 현대적 감성',
    promptKeyword: 'Modern minimalist vector flat design, clean geometric silhouettes, bold harmonious color palette, editorial infographic look'
  },
  {
    id: 'oil_classic',
    title: '유화 및 클래식',
    desc: '풍부한 질감과 고전적인 미감',
    promptKeyword: 'Classic oil painting texture, rich impasto canvas details, dramatic chiaroscuro lighting, timeless masterpiece aesthetic'
  },
  {
    id: 'crayon_sketch',
    title: '크레파스 및 스케치',
    desc: '아이들이 그린 듯한 친근한 질감',
    promptKeyword: 'Nostalgic colored crayon and pencil sketch, hand-drawn paper grain, innocent and charming storybook art style'
  },
  {
    id: 'paper_cutout',
    title: '종이 오리기풍',
    desc: '입체적인 종이 질감과 그림자 효과',
    promptKeyword: 'Layered papercraft cutout art, tactile 3D paper relief depth, realistic casting shadows, organic craft look'
  },
  {
    id: 'ghibli',
    title: '지브리 애니메이션풍',
    desc: '따뜻하고 상세한 자연과 풍경 묘사',
    promptKeyword: 'Studio Ghibli aesthetic, lush hand-painted scenery, golden hour natural sunlight, nostalgic and heartwarming vibe'
  },
  {
    id: 'minecraft',
    title: '마인크래프트풍',
    desc: '정육면체 블록으로 구성된 입체적이고 레트로한 감성',
    hasCustomIcon: true,
    promptKeyword: 'Voxel art, Minecraft blocky isometric style, textured cubic modules, retro 3D pixel lighting, playful gaming aesthetic'
  }
];

// 페이지 수 목록
const PAGE_OPTIONS = ['5P', '10P', '15P'];

export default function App() {
  // 상태 관리
  const [topic, setTopic] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('academic');
  const [selectedStyle, setSelectedStyle] = useState('minecraft');
  const [selectedPages, setSelectedPages] = useState('10P');

  // PDF 파일 업로드 상태 관리
  const [pdfFile, setPdfFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // 생성 결과 모달 상태
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('gemini_prompt');
  const [copied, setCopied] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);

  // 현재 선택된 객체들
  const currentAudience = AUDIENCE_OPTIONS.find(a => a.id === selectedAudience) || AUDIENCE_OPTIONS[0];
  const currentStyle = STYLE_OPTIONS.find(s => s.id === selectedStyle) || STYLE_OPTIONS[7];
  const pageCountNum = parseInt(selectedPages.replace('P', ''), 10);

  // PDF 파일 선택 핸들러
  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('PDF 형식의 파일만 업로드할 수 있습니다.');
      return;
    }
    setPdfFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      sizeBytes: file.size,
      rawFile: file
    });
    // 주제 입력이 비어있으면 파일명을 기반으로 자동 추천
    if (!topic.trim()) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setTopic(`[PDF 기반] ${cleanName} 내용의 핵심 요약 및 슬라이드 발표 가이드`);
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // 파일 삭제
  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 프롬프트 생성 로직
  const handleGenerate = () => {
    setIsGenerating(true);

    const actualTopic = topic.trim() || (pdfFile ? `[PDF 문서] ${pdfFile.name} 기반 프레젠테이션` : '양자 얽힘 현상을 시각적으로 설명하는 가이드');

    setTimeout(() => {
      // 페이지별 Slides 장표 프롬프트 생성
      const pages = [];
      for (let i = 1; i <= pageCountNum; i++) {
        let slideTitle = '';
        let slideExplanation = '';
        let visualDesc = '';
        let imagePromptEn = '';

        if (selectedAudience === 'general_public') {
          // 20세 이상 일반 대중 타깃 슬라이드
          if (i === 1) {
            slideTitle = `Slide 1: 표지 및 오프닝 - ${actualTopic}`;
            slideExplanation = `우리의 일상 속 익숙한 현상에서 출발하여 '${actualTopic}'의 본질적인 흥미와 질문을 던지는 도입부. 청중의 즉각적인 몰입과 공감을 이끌어내는 핵심 질문 제시.${pdfFile ? ` (참고 문서: ${pdfFile.name})` : ''}`;
            visualDesc = `넓은 여백의 미학을 살린 미니멀 슬라이드 레이아웃. 중앙에 ${currentStyle.title}으로 표현된 상징적 키 비주얼과 선명하고 세련된 헤드라인 타이포그래피.`;
            imagePromptEn = `${currentStyle.promptKeyword}, cinematic keynote presentation title slide visual about ${actualTopic}, modern clean composition, focal spotlight, professional presentation graphic --ar 16:9`;
          } else if (i === pageCountNum) {
            slideTitle = `Slide ${i}: 핵심 정리 및 액션 플랜 (Summary & Takeaway)`;
            slideExplanation = `전체 발표의 핵심 메시지 3가지를 명확히 재정리하고, 청중이 일상이나 업무에서 실제로 적용하고 기억해야 할 최종 인사이트를 전달.`;
            visualDesc = `3분할 카드 그리드 구조로 핵심 요약이 배치되고, 우측 상단에 미래지향적 심볼이 조화롭게 결합된 결론 장표.`;
            imagePromptEn = `${currentStyle.promptKeyword}, conceptual conclusion illustration representing future vision and actionable takeaways for ${actualTopic}, harmonious design, clean presentation background --ar 16:9`;
          } else {
            slideTitle = `Slide ${i}: 핵심 원리 및 실제 사례 분석 Part ${i - 1}`;
            slideExplanation = `전문 용어를 친숙한 일상 비유로 치환하여 설명. 20대 이상 성인 청중이 직관적으로 이해할 수 있는 구체적인 실제 사례와 비교 분석 데이터 전달.`;
            visualDesc = `비교 대조(Before & After) 인포그래픽 구조. 좌우로 대비되는 시각 요소와 깔끔한 화살표 흐름선이 돋보이는 레이아웃.`;
            imagePromptEn = `${currentStyle.promptKeyword}, infographic comparison elements illustrating ${actualTopic}, structured visual storytelling, modern diagram aesthetic --ar 16:9`;
          }
        } else if (selectedAudience === 'academic') {
          // 대학생(원) 학술 가이드 슬라이드
          if (i === 1) {
            slideTitle = `Slide 1: 연구 배경 및 문제 제기 (Research Background)`;
            slideExplanation = `고전 역학적 국소 실재론(Local Realism)의 한계와 비국소성(Non-locality)의 학술적 등장 배경. 연구 질문(Research Question) 정의 및 세미나 로드맵 제시.${pdfFile ? ` (원문 출처: ${pdfFile.name})` : ''}`;
            visualDesc = `시공간 텐서 그리드 위에 두 입자의 얽힘 상태를 복셀(Voxel) 블록 아트로 시각화한 엄밀하고 세련된 학술 타이틀 장표.`;
            imagePromptEn = `${currentStyle.promptKeyword}, two entangled quantum particles represented as glowing cubic voxel elements on a 3D isometric grid, academic visualization, sharp focus, clean background --ar 16:9`;
          } else if (i === pageCountNum) {
            slideTitle = `Slide ${i}: 결론 및 연구 시사점 (Conclusion & Quantum Horizons)`;
            slideExplanation = `양자 상태 제어 기술의 현주소와 양자 컴퓨터(Qubit) 및 양자 암호 통신(QKD)으로의 확장 가능성. 잔여 연구 과제와 학술적 전망 종합.`;
            visualDesc = `무수히 많은 마인크래프트 스타일 블록 네트워크가 연결되어 거대한 양자 데이터 큐브 클러스터를 형성하는 모습.`;
            imagePromptEn = `${currentStyle.promptKeyword}, futuristic quantum network cluster made of voxel cubes, optical fiber data streams connecting cube nodes, epic perspective, clean isometric presentation --ar 16:9`;
          } else {
            slideTitle = `Slide ${i}: 상태 진화 및 실험적 검증 메커니즘 Part ${i - 1}`;
            slideExplanation = `파동함수 붕괴와 벨의 부등식(Bell's Inequality) 실험 데이터 해석. 관측 행위가 시스템의 중첩 상태와 엔트로피 변화에 미치는 물리적 영향 분석.`;
            visualDesc = `관측 센서 장치 블록이 중첩 큐브를 측정하는 순간 스핀 상태가 결정되는 프로세스를 단계별로 표현한 장표 레이아웃.`;
            imagePromptEn = `${currentStyle.promptKeyword}, laboratory observation scene measuring superposition voxel blocks, dramatic scientific block lighting, detailed isometric perspective --ar 16:9`;
          }
        } else {
          // 초등 저학년/고학년 슬라이드
          slideTitle = `Slide ${i}: 제 ${i}단계 - 흥미진진한 발견`;
          slideExplanation = `눈높이에 맞춘 질문과 답변 형식으로 호기심을 유도하며 ${actualTopic}의 기본 개념을 쉽고 재미있게 풀어낸 교육용 슬라이드.`;
          visualDesc = `${currentStyle.title}으로 귀엽고 친근하게 표현된 캐릭터와 말풍선, 직관적인 아이콘으로 채워진 교육 장표.`;
          imagePromptEn = `${currentStyle.promptKeyword}, educational presentation slide for students about ${actualTopic}, friendly characters, vibrant colors, clear layout --ar 16:9`;
        }

        pages.push({
          pageNumber: i,
          title: slideTitle,
          slideExplanation,
          visualDesc,
          imagePromptEn
        });
      }

      // Gemini 입력용 프레젠테이션 슬라이드 전용 마크다운 프롬프트 작성
      const geminiSystemPrompt = `# [Gemini System Prompt]: AI Presentation Slide Deck Architect

너는 전 세계 최고 수준의 '프레젠테이션 슬라이드 기획자(Presentation Strategist)'이자 '비주얼 스토리텔러'이다.
제시된 조건과 설정에 따라 청중의 마음을 사로잡는 완벽한 슬라이드 발표 장표(Slide Deck)를 기획하라.

## 1. 프로젝트 기본 정보
- **주제 및 핵심 아이디어**: ${actualTopic}
${pdfFile ? `- **참조 업로드 PDF 파일**: \`${pdfFile.name}\` (${pdfFile.size}) - 해당 문서의 핵심 논리 및 데이터 반영\n` : ''}- **대상 청중(독자)**: ${currentAudience.title} (${currentAudience.desc})
- **기획 톤앤매너**: ${currentAudience.promptTone}
- **슬라이드 비주얼 스타일**: ${currentStyle.title} (${currentStyle.desc})
- **총 슬라이드 수**: ${selectedPages} (${pageCountNum} Slides)

## 2. 세부 장표 작성 지침
1. **각 Slide별 구성 요소**:
   - **Slide 번호 및 제목 (Slide Title)**: 해당 장표의 핵심 메시지를 한 문장으로 압축한 헤드라인
   - **Slide 설명 (Core Message & Script)**: 
     - 발표자가 무대에서 전달할 핵심 스피치 요점 및 청중을 설득하는 세부 설명
     - 대상 청중의 수준에 최적화된 설득력 있는 논리 전개
   - **Slide 비주얼 연출 (Visual Layout & Direction)**:
     - 텍스트와 비주얼의 조화, 다이어그램, 카드 그리드, 인포그래픽 배치 지시
   - **Slide 비주얼 프롬프트 (Midjourney / Imagen 3 / DALL-E 영문 프롬프트)**:
     - 스타일 키워드: \`${currentStyle.promptKeyword}\`
     - 16:9 프레젠테이션 비율에 최적화된 고해상도 그래픽 프롬프트 (\`--ar 16:9\`)

2. **전체 슬라이드 전개 흐름 (Story Arc)**:
   - 1P ~ ${Math.ceil(pageCountNum * 0.3)}P: Hook & 문제 제기 (청중의 관심 유도 및 공감대 형성)
   - ${Math.ceil(pageCountNum * 0.3) + 1}P ~ ${Math.floor(pageCountNum * 0.8)}P: Body & 핵심 솔루션 (원리 설명, 구체적 데이터 및 사례)
   - ${Math.floor(pageCountNum * 0.8) + 1}P ~ ${pageCountNum}P: Conclusion & Takeaway (핵심 메시지 요약 및 강력한 결론)

## 3. 출력 포맷
Markdown 형식으로 각 슬라이드 번호별 블록을 명확히 구분하여 출력할 것.`;

      setGeneratedData({
        topic: actualTopic,
        pdfFile,
        audience: currentAudience,
        style: currentStyle,
        pagesCount: selectedPages,
        geminiPrompt: geminiSystemPrompt,
        pagesList: pages
      });

      setIsGenerating(false);
      setShowResult(true);
    }, 600);
  };

  // 페이지별 Slides 화면의 전체 내용을 텍스트로 변환
  const getPagesBreakdownText = (data) => {
    if (!data || !data.pagesList) return '';
    return `# [페이지별 Slides 장표 구성안]
- 주제: ${data.topic}
${data.pdfFile ? `- 참조 PDF: ${data.pdfFile.name}\n` : ''}- 대상 청중: ${data.audience.title}
- 슬라이드 비주얼 스타일: ${data.style.title}
- 총 슬라이드 수: ${data.pagesCount}

` + data.pagesList.map((p) => `### ${p.title}
📊 Slide 설명:
${p.slideExplanation}

🎨 Slide 비주얼 연출:
${p.visualDesc}

🖼️ Slide 비주얼 프롬프트 (EN):
${p.imagePromptEn}
`).join('\n---\n\n');
  };

  // 현재 활성화된 탭의 내용 텍스트 반환
  const getCurrentTabText = () => {
    if (!generatedData) return '';
    return activeTab === 'pages_breakdown'
      ? getPagesBreakdownText(generatedData)
      : generatedData.geminiPrompt;
  };

  // 클립보드 복사
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 마크다운 파일 다운로드
  const handleDownload = () => {
    if (!generatedData) return;
    const content = getCurrentTabText();
    const prefix = activeTab === 'pages_breakdown' ? 'Jowon_Slides_Breakdown' : 'Jowon_Slides_Prompt';
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/markdown;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${prefix}_${generatedData.topic.slice(0, 15)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center font-sans antialiased text-slate-800">
      
      {/* 1. 상단 헤더 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
          Jowon Slide Prompt Maker
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-500 font-medium">
          나만의 AI 프레젠테이션 슬라이드 및 학술 가이드를 기획하세요
        </p>
      </div>

      {/* 2. 메인 컨트롤 컨테이너 */}
      <div className="w-full max-w-[960px] bg-white rounded-3xl p-7 md:p-9 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all">
        
        {/* 상단 2열 그리드: (PDF 업로드 & 주제 입력) vs 독자 설정 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          
          {/* 좌측 컬럼: PDF 파일 업로드 + 주제 및 핵심 아이디어 */}
          <div className="flex flex-col justify-between">
            
            {/* 2-1. PDF 파일 업로드 항목 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2.5">
                <FileUp className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  pdf 파일 업로드
                </span>
              </div>

              {/* 숨겨진 실제 File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              {/* 드래그 앤 드롭 업로드 카드 영역 */}
              {!pdfFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isDragging 
                      ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01]' 
                      : 'border-slate-200 bg-slate-50/40 hover:border-indigo-400 hover:bg-indigo-50/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FileUp className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-slate-700">
                    PDF 파일을 드래그하여 놓거나 <span className="text-indigo-600 underline">파일 찾기</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    슬라이드로 변환할 PDF 문서 업로드 (최대 50MB)
                  </div>
                </div>
              ) : (
                <div className="border border-indigo-200 bg-indigo-50/30 rounded-2xl p-3 flex items-center justify-between transition-all shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <File className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate" title={pdfFile.name}>
                        {pdfFile.name}
                      </div>
                      <div className="text-[10px] text-indigo-600 font-medium">
                        {pdfFile.size} • 업로드 완료
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
                    title="파일 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 2-2. 주제 및 핵심 아이디어 */}
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 fill-indigo-100" />
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  주제 및 핵심 아이디어
                </span>
              </div>
              
              <div className="relative flex-1">
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="예: 양자 얽힘 현상을 시각적으로 설명하는 가이드"
                  className="w-full h-[142px] p-3.5 text-sm text-slate-800 placeholder-slate-400 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none shadow-xs"
                />
              </div>
            </div>

          </div>

          {/* 우측 컬럼: 독자 설정 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-slate-800 tracking-tight">
                독자 설정
              </span>
            </div>

            <div className="space-y-2.5">
              {AUDIENCE_OPTIONS.map((item) => {
                const isSelected = selectedAudience === item.id;
                const IconComponent = item.icon;
                
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAudience(item.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-2 border-indigo-600 bg-indigo-50/10 shadow-xs' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-bold tracking-tight ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                        {item.title}
                      </div>
                      <div className={`text-xs mt-0.5 truncate ${isSelected ? 'text-indigo-600/80 font-medium' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 중간 섹션: 삽화 스타일 (전체 보기) */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-800 tracking-tight">
              삽화 스타일 (전체 보기)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = selectedStyle === style.id;
              
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-[86px] ${
                    isSelected
                      ? 'border-2 border-indigo-600 bg-indigo-50/10 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {style.hasCustomIcon && (
                      <Box className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`} />
                    )}
                    <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                      {style.title}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed line-clamp-1 ${isSelected ? 'text-indigo-600/80 font-medium' : 'text-slate-400'}`}>
                    {style.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 하단 섹션: 페이지 수 설정 & 생성 버튼 */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* 좌측: 페이지 수 설정 */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-slate-800 tracking-tight">
                페이지 수 설정
              </span>
            </div>

            <div className="inline-flex bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/50 w-fit">
              {PAGE_OPTIONS.map((page) => {
                const isSelected = selectedPages === page;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setSelectedPages(page)}
                    className={`px-8 py-2.5 text-sm rounded-xl font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 font-medium'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 우측: 생성 버튼 */}
          <div className="self-end md:self-end w-full md:w-auto">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full md:w-[380px] h-[52px] bg-[#c5d0e0] hover:bg-indigo-600 active:scale-[0.99] text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>슬라이드 프롬프트 생성 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{currentAudience.buttonText}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* 3. 프롬프트 생성 결과 모달 */}
      {showResult && generatedData && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* 모달 상단 헤더 */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Slide 프롬프트 생성 완료
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    주제: <span className="text-indigo-600 font-semibold">{generatedData.topic}</span>
                    {generatedData.pdfFile && (
                      <span className="ml-2 text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-md">
                        PDF: {generatedData.pdfFile.name}
                      </span>
                    )}
                    {' '}• {generatedData.audience.title} • {generatedData.style.title} • {generatedData.pagesCount}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(getCurrentTabText())}
                  className="px-3.5 py-2 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료!' : (activeTab === 'pages_breakdown' ? 'Slides 전체 복사' : '전체 복사')}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Markdown 다운로드"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowResult(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 탭 네비게이션 */}
            <div className="flex border-b border-slate-100 px-6 gap-6 bg-white">
              <button
                type="button"
                onClick={() => setActiveTab('gemini_prompt')}
                className={`py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'gemini_prompt' 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Gemini 시스템 프롬프트</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pages_breakdown')}
                className={`py-3.5 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'pages_breakdown' 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>페이지별 Slides ({generatedData.pagesList.length}P)</span>
              </button>
            </div>

            {/* 탭 본문 영역 */}
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
              {activeTab === 'gemini_prompt' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl">
                    <div className="text-xs text-indigo-900 leading-relaxed">
                      💡 <strong>사용 팁:</strong> 아래 프롬프트를 복사하여 Google Gemini, ChatGPT, Claude 등에 입력하면 설정하신 대상과 슬라이드 스타일에 부합하는 완벽한 프레젠테이션 장표 기획서와 시각화 프롬프트가 산출됩니다.
                    </div>
                    <a
                      href="https://gemini.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-4 shrink-0 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 flex items-center gap-1 transition-colors"
                    >
                      <span>Gemini 열기</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <pre className="p-5 bg-slate-900 text-slate-100 text-xs md:text-sm rounded-2xl overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap selection:bg-indigo-500 selection:text-white">
                    {generatedData.geminiPrompt}
                  </pre>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedData.pagesList.map((p) => (
                    <div key={p.pageNumber} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-sm text-indigo-600">
                          {p.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(p.imagePromptEn)}
                          className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>비주얼 프롬프트 복사</span>
                        </button>
                      </div>
                      
                      <div className="text-xs text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900">📊 Slide 설명: </span>
                        {p.slideExplanation}
                      </div>

                      <div className="text-xs text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-900">🎨 Slide 비주얼 연출: </span>
                        {p.visualDesc}
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-600">
                        <span className="font-bold text-slate-400 block mb-1">Slide 비주얼 프롬프트 (EN):</span>
                        {p.imagePromptEn}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 모달 하단 푸터 */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={() => handleCopy(getCurrentTabText())}
                className="px-5 py-2.5 text-sm font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? '복사 완료됨!' : (activeTab === 'pages_breakdown' ? 'Slides 전체 복사' : '프롬프트 복사하고 완료')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
