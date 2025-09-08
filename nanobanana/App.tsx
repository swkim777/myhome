
import React, { useState, useCallback, useMemo } from 'react';
import { GenerationMode, Inspiration, PromptTemplate } from './types';
import { INSPIRATIONS, PROMPT_TEMPLATES } from './constants';
import { generateImageFromText, editOrCompositeImage, GenerationResult } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { SparklesIcon, LightBulbIcon } from './components/icons';

interface UploadedImage {
  base64: string;
  mimeType: string;
  name: string;
  url: string;
}

const Header: React.FC = () => (
  <header className="bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700 sticky top-0 z-10">
    <div className="container mx-auto flex items-center gap-3">
      <SparklesIcon className="w-8 h-8 text-indigo-400" />
      <h1 className="text-2xl font-bold tracking-tight text-white">Gemini 이미지 생성 스튜디오</h1>
    </div>
  </header>
);

const InspirationCard: React.FC<{ inspiration: Inspiration; onSelect: () => void }> = ({ inspiration, onSelect }) => (
    <div onClick={onSelect} className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-indigo-500 hover:bg-slate-700/50 cursor-pointer transition-all duration-200">
        <h3 className="font-semibold text-indigo-300">{inspiration.title}</h3>
        <p className="text-sm text-slate-400 mt-1">{inspiration.description}</p>
    </div>
);

const PromptTemplateCard: React.FC<{ template: PromptTemplate; onSelect: () => void }> = ({ template, onSelect }) => (
    <button 
      onClick={onSelect} 
      className="w-full text-left bg-slate-700/50 p-3 rounded-md border border-slate-600 hover:border-indigo-500 hover:bg-slate-700/80 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={`${template.title} 템플릿 선택`}
    >
      <h4 className="font-semibold text-indigo-400 text-sm">{template.title}</h4>
      <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-900/50 p-1 rounded-sm">{template.template}</p>
    </button>
  );

export default function App() {
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.TextToImage);
  const [prompt, setPrompt] = useState<string>('');
  const [inputImages, setInputImages] = useState<(UploadedImage | undefined)[]>([]);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInspirationSelect = useCallback((inspiration: Inspiration) => {
    setMode(inspiration.mode);
    setPrompt(inspiration.prompt);
    setInputImages([]);
    setResult(null);
    setError(null);
  }, []);
  
  const handleImageUpload = (index: number) => (file: { base64: string; mimeType: string; name: string; }) => {
      const url = `data:${file.mimeType};base64,${file.base64}`;
      setInputImages(prevImages => {
          const newImages = [...prevImages];
          newImages[index] = { ...file, url };
          return newImages;
      });
  };
  
  const handleRemoveImage = (index: number) => () => {
      setInputImages(prevImages => {
          const newImages = [...prevImages];
          newImages[index] = undefined;
          return newImages;
      });
  };

  const imageUploaderCount = useMemo(() => {
    switch (mode) {
      case GenerationMode.TextToImage: return 0;
      case GenerationMode.ImageAndText: return 1;
      case GenerationMode.MultiImage: return 2;
      default: return 0;
    }
  }, [mode]);

  const handleSubmit = async () => {
    if (!prompt || isLoading) return;
    
    const validImages = inputImages.filter((img): img is UploadedImage => !!img);

    if (mode !== GenerationMode.TextToImage && validImages.length < imageUploaderCount) {
      setError(`이 모드에서는 ${imageUploaderCount}개의 이미지가 필요합니다.`);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let response: GenerationResult;
      if (mode === GenerationMode.TextToImage) {
        response = await generateImageFromText(prompt);
      } else {
        response = await editOrCompositeImage(prompt, validImages);
      }
      setResult(response);
    } catch (e: any) {
      setError(e.message || '이미지 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Controls */}
        <div className="flex flex-col gap-8 sticky top-24">
            {/* Inspirations */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                    <LightBulbIcon className="w-6 h-6 text-yellow-300"/>
                    <h2 className="text-xl font-bold text-white">영감 얻기</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {INSPIRATIONS.map(insp => (
                        <InspirationCard key={insp.title} inspiration={insp} onSelect={() => handleInspirationSelect(insp)} />
                    ))}
                </div>
            </div>

            {/* Generation Form */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-white">이미지 생성하기</h2>
              
              {/* Image Uploaders */}
              {imageUploaderCount > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {imageUploaderCount === 1 ? '이미지 업로드' : '이미지 업로드 (최대 2개)'}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: imageUploaderCount }).map((_, index) => (
                        <ImageUploader 
                          key={index}
                          onImageUpload={handleImageUpload(index)}
                          uploadedImage={inputImages[index] ? { url: inputImages[index]!.url, name: inputImages[index]!.name } : null}
                          onRemoveImage={handleRemoveImage(index)}
                          placeholderText={`이미지 ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
              )}
              
              {/* Prompt Input */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
                  프롬프트
                </label>
                <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROMPT_TEMPLATES[mode].map(template => (
                        <PromptTemplateCard 
                            key={template.title} 
                            template={template} 
                            onSelect={() => setPrompt(template.template)}
                        />
                    ))}
                </div>
                <textarea
                  id="prompt"
                  rows={5}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="예: 멋진 레스토랑에 있는 나노 바나나 요리"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !prompt}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    생성 중...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5"/>
                    생성
                  </>
                )}
              </button>
            </div>
        </div>

        {/* Right Column: Results */}
        <div className="bg-slate-800/50 min-h-[60vh] rounded-xl border border-slate-700 flex flex-col items-center justify-center p-6 sticky top-24">
            {isLoading && (
              <div className="text-center text-slate-400">
                <div className="animate-pulse">
                  <SparklesIcon className="w-16 h-16 mx-auto text-indigo-400"/>
                </div>
                <p className="mt-4 text-lg">Gemini가 마법을 부리고 있습니다...</p>
                <p className="text-sm">잠시만 기다려 주세요.</p>
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">오류 발생</h3>
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && result?.imageUrl && (
              <div className="w-full flex flex-col items-center gap-4">
                 <img src={result.imageUrl} alt="생성된 이미지" className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl shadow-black/50"/>
                 {result.text && <p className="text-slate-300 mt-2 p-3 bg-slate-900 rounded-md w-full text-center">{result.text}</p>}
                 <a 
                    href={result.imageUrl} 
                    download="gemini-generated-image.png"
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    다운로드
                </a>
              </div>
            )}
            {!isLoading && !error && !result && (
                <div className="text-center text-slate-500">
                    <SparklesIcon className="w-16 h-16 mx-auto"/>
                    <p className="mt-4 text-lg">생성된 이미지가 여기에 표시됩니다.</p>
                    <p className="text-sm">왼쪽에서 영감을 선택하거나 직접 프롬프트를 입력하세요.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
