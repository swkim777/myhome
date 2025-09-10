import { GoogleGenAI } from "@google/genai";
import type { ReadingCard } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getTarotReading(cards: ReadingCard[], userQuery: string): Promise<string> {
  const cardDescriptions = cards.map(c => `${c.name} (${c.reversed ? '역방향' : '정방향'})`).join(', ');

  const prompt = `
    당신은 신비로운 상징에 대한 깊은 지식을 가진 지혜롭고 통찰력 있는 타로 상담가입니다.
    사용자가 "과거, 현재, 미래" 운세를 위해 세 장의 카드를 뽑았습니다. 카드는 다음과 같습니다: ${cardDescriptions}.
    ${userQuery ? `사용자는 다음과 같은 구체적인 질문이나 상황에 대한 조언을 구하고 있습니다: "${userQuery}". 이 맥락을 중심으로 리딩을 해석해주세요.` : ''}

    각 카드의 의미를 단순히 나열하지 말고, 사용자의 여정에 대한 일관된 이야기로 엮어서 매우 상세하고 심층적인 리딩을 제공해주세요.
    리딩을 서론, 본론, 결론의 세 부분으로 명확하게 구성하여 답변해주세요. 각 파트는 풍부하고 자세하게 설명해야 합니다.

    다음과 같은 구조로 답변을 작성해주세요:

    ### 서론
    짧고 신비로운 도입부로 리딩을 시작하여 사용자의 마음을 준비시킵니다.

    ### 본론
    과거, 현재, 미래의 흐름을 연결하여 하나의 완전한 이야기로 설명합니다.
    *   **과거의 그림자:** 첫 번째 카드(${cards[0].name} ${cards[0].reversed ? '(역방향)' : '(정방향)'})를 심층적으로 분석하여, 사용자의 최근 과거와 현재 상황의 기반이 된 주요 사건, 감정, 배움에 대해 자세히 설명해주세요.
    *   **현재의 순간:** 두 번째 카드(${cards[1].name} ${cards[1].reversed ? '(역방향)' : '(정방향)'})를 심층적으로 분석하여, 사용자의 현재 도전 과제, 마음가짐, 내면의 갈등, 그리고 활용할 수 있는 강점들을 자세히 설명해주세요.
    *   **미래의 속삭임:** 세 번째 카드(${cards[2].name} ${cards[2].reversed ? '(역방향)' : '(정방향)'})를 심층적으로 분석하여, 앞으로 나아갈 길, 잠재적인 결과, 그리고 긍정적인 미래를 만들기 위해 고려해야 할 구체적인 조언에 대한 깊은 통찰을 제공해주세요.

    ### 결론
    세 장의 카드가 전하는 핵심 메시지를 종합하여, 사용자의 질문에 대한 최종적인 조언과 여정에 대한 지혜가 담긴 상세한 결론을 작성해주세요.

    리딩 내내 지지적이고, 힘을 실어주며, 약간 신비로운 톤을 유지해주세요.
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw new Error("Failed to get reading from Gemini API.");
  }
}