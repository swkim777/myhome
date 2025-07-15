/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, GenerateContentResponse, GroundingChunk } from '@google/genai';

// --- DOM Element References ---
const searchForm = document.getElementById('search-form') as HTMLFormElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const loader = document.getElementById('loader') as HTMLDivElement;
const responseText = document.getElementById('response-text') as HTMLDivElement;
const sourcesContainer = document.getElementById('sources-container') as HTMLDivElement;

// --- Gemini API Initialization ---
// NOTE: The API key is stored in an environment variable `process.env.API_KEY`
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

/**
 * Sets the UI state to loading or not loading.
 * @param {boolean} isLoading - Whether the app is currently loading.
 */
function setLoading(isLoading: boolean) {
    if (isLoading) {
        loader.classList.add('visible');
        searchButton.disabled = true;
        searchInput.disabled = true;
        responseText.textContent = '';
        sourcesContainer.innerHTML = '';
    } else {
        loader.classList.remove('visible');
        searchButton.disabled = false;
        searchInput.disabled = false;
    }
}

/**
 * Renders the sources from grounding metadata.
 * @param {GroundingChunk[]} sources - Array of grounding chunks.
 */
function renderSources(sources?: GroundingChunk[]) {
    if (!sources || sources.length === 0) {
        sourcesContainer.innerHTML = '';
        return;
    }

    const uniqueSources = sources.filter(
      (source, index, self) =>
        source.web && self.findIndex(s => s.web?.uri === source.web?.uri) === index
    );

    if (uniqueSources.length > 0) {
        let sourcesHTML = `<h3>출처</h3><ul>`;
        uniqueSources.forEach(source => {
            if (source.web) {
                 sourcesHTML += `<li><a href="${source.web.uri}" target="_blank" rel="noopener noreferrer">${source.web.title || source.web.uri}</a></li>`;
            }
        });
        sourcesHTML += `</ul>`;
        sourcesContainer.innerHTML = sourcesHTML;
    }
}

/**
 * Fetches news from the Gemini API using a given prompt.
 * @param {string} prompt - The user's search query.
 */
async function fetchNews(prompt: string) {
    setLoading(true);

    try {
        const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: `오늘의 주요 주식 시장 뉴스를 요약해줘. 특히 다음 내용에 집중해줘: ${prompt}`,
            config: {
                tools: [{googleSearch: {}}],
            },
        });

        let allGroundingChunks: GroundingChunk[] = [];
        // Update the UI with text chunks as they arrive and collect grounding chunks
        for await (const chunk of responseStream) {
            responseText.textContent += chunk.text;
            const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
            if (groundingMetadata?.groundingChunks) {
                allGroundingChunks.push(...groundingMetadata.groundingChunks);
            }
        }
        
        renderSources(allGroundingChunks);

    } catch (error) {
        console.error("API Error:", error);
        responseText.textContent = "뉴스 검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    } finally {
        setLoading(false);
    }
}

// --- Event Listeners ---
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const prompt = searchInput.value.trim();
    if (prompt) {
        fetchNews(prompt);
    }
});

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    const initialPrompt = "오늘 주식 시장 주요 뉴스";
    searchInput.value = initialPrompt;
    fetchNews(initialPrompt);
});
