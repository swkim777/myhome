import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateEconomicReport() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const systemInstruction = `
너는 실시간 경제 뉴스를 요약하는 애널리스트다.
반드시 "최근 24시간 이내"에 발행된 뉴스/자료만 사용해야 한다.
날짜가 24시간 이내인지 명확하지 않은 자료는 사용하지 말고,
데이터가 없으면 "최근 24시간 이내에 신뢰할 만한 공개 자료 없음"이라고 말해라.
Google Search 도구를 사용해 최신 정보를 찾아라.
`.trim();

  const userPrompt = `
기간: ${yesterday.toISOString()} ~ ${now.toISOString()} (UTC, 최근 24시간)

아래 항목에 대해 한국어로 블로그용 리포트를 작성해줘.
- 미국 경제 동향
- 미국 연준(Fed) 금리 동향
- 나스닥 기술주 흐름

목차:
1. 오늘의 경제 헤드라인 (가장 중요한 이슈 1가지)
2. 시장 데이터 요약 (S&P 500, 나스닥, 달러 인덱스 등 최신 수치 포함)
3. 심층 분석: 현재 시장이 우려하거나 기대하는 핵심 포인트
4. 투자자 시사점 및 대응 전략
5. 관련 태그 (#경제뉴스 #주식시장 #Gemini분석)

출력은 반드시 Markdown 형식으로.
각 사실 옆에는 가능하면 (출처: 매체명, 날짜) 를 간단히 표기해줘.
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "user", parts: [{ text: userPrompt }] },
      ],
      config: {
        // 🔹 Google Search grounding 유지
        tools: [{ googleSearch: {} }],
        // 🔹 사실 위주로, 과거 자료 재사용 줄이기 위해 온도 약간 낮춤
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2048,
        },
      },
    });

    const text =
      response.candidates?.[0]?.content?.parts
        ?.map(p => p.text ?? "")
        .join("\n") || response.text || "콘텐츠를 생성할 수 없습니다.";

    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources =
      chunks
        .map((chunk: any) => chunk.web)
        .filter((w: any) => w?.title && w?.uri)
        .map((w: any) => ({
          title: w.title,
          uri: w.uri,
        })) || [];

    return { content: text, sources };
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}
