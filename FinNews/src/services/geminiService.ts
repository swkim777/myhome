import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateEconomicBlog() {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    최근 24시간 이내의 [미국 경제 동향], [미국 연준(Fed) 금리 동향], [나스닥 기술주 흐름]에 대한 최신 경제 뉴스를 검색하고, 아래 목차에 맞춰 전문적인 블로그 포스트를 작성해줘.
    
    [블로그 포스트 목차]
    1. 오늘의 경제 헤드라인 (가장 중요한 이슈 1가지)
    2. 시장 데이터 요약 (S&P 500, 나스닥, 달러 인덱스 등 최신 수치 포함)
    3. 심층 분석: 현재 시장이 우려하거나 기대하는 핵심 포인트
    4. 투자자 시사점 및 대응 전략
    5. 관련 태그 (#경제뉴스 #주식시장 #Gemini분석)
    
    응답은 마크다운(Markdown) 형식으로 작성해줘.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    return {
      text: response.text || "내용을 생성할 수 없습니다.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
