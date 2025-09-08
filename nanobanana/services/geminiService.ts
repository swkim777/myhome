import { GoogleGenAI, Modality, Part, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GenerationResult {
    imageUrl: string | null;
    text: string | null;
}

/**
 * Generates an image from a text prompt using the imagen-4.0 model.
 */
export const generateImageFromText = async (
    prompt: string
): Promise<GenerationResult> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
            return { imageUrl, text: null };
        } else {
            throw new Error("API가 이미지를 반환하지 않았습니다. 프롬프트를 수정해 보세요.");
        }
    } catch (error) {
        console.error("Gemini API Error (generateImageFromText):", error);
        if (error instanceof Error) {
            return Promise.reject(new Error(`Gemini API에서 오류가 발생했습니다: ${error.message}`));
        }
        return Promise.reject(new Error("알 수 없는 Gemini API 오류가 발생했습니다."));
    }
};

const fileToGenerativePart = (base64Data: string, mimeType: string): Part => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

/**
 * Edits or composites an image based on a prompt and input images
 * using the gemini-2.5-flash-image-preview model.
 */
export const editOrCompositeImage = async (
  prompt: string,
  images: { base64: string; mimeType: string }[]
): Promise<GenerationResult> => {
  try {
    const parts: Part[] = [];

    images.forEach(image => {
      parts.push(fileToGenerativePart(image.base64, image.mimeType));
    });
    
    parts.push({ text: prompt });

    const result: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: { parts },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (result.candidates && result.candidates.length > 0) {
        for (const part of result.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            } else if (part.text) {
                text = part.text;
            }
        }
    }
    
    if (!imageUrl) {
      throw new Error("API가 이미지를 반환하지 않았습니다. 프롬프트를 수정해 보세요.");
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Gemini API Error (editOrCompositeImage):", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Gemini API에서 오류가 발생했습니다: ${error.message}`));
    }
    return Promise.reject(new Error("알 수 없는 Gemini API 오류가 발생했습니다."));
  }
};