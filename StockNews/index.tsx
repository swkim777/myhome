/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, GenerateContentResponse, GroundingChunk } from '@google/genai';

// --- DOM Element References ---
const apiKeySection = document.getElementById('api-key-section') as HTMLDivElement;
const apiKeyInput = document.getElementById('api-key-input') as HTMLInputElement;
const saveApiKeyButton = document.getElementById('save-api-key-button') as HTMLButtonElement;
const changeKeyButton = document.getElementById('change-key-button') as HTMLButtonElement;

const appContent = document.getElementById('app-content') as HTMLDivElement;
const searchForm = document.getElementById('search-form') as HTMLFormElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const loader = document.getElementById('loader') as HTMLDivElement;
const responseText = document.getElementById('response-text') as HTMLDivElement;
const sourcesContainer = document.getElementById('sources-container') as HTMLDivElement;

// --- Gemini API Initialization ---
let ai: GoogleGenAI | null = null;

/**
 * Initializes the GoogleGenAI instance with the provided key.
 * @param {string} apiKey - The user's Google Gemini API key.
 */
function initializeAi(apiKey: string) {
    if (!apiKey) {
        alert("API 키를 입력해주세요.");
        return false;
    }
    try {
        ai = new GoogleGenAI({apiKey});
        return true;
    } catch (error) {
        console.error("AI Initialization Error:", error);
        alert("유효하지 않은 API 키입니다. 다시 확인해주세요.");
        return false;
    }
}

/**
 * Toggles the visibility of the main app content and the API key input section.
 * @param {boolean} showApp - Whether to show the main application content.
 */
function toggleAppVisibility(showApp: boolean) {
    if (showApp) {
        apiKeySection.classList.add('hidden');
        appContent.classList.remove('hidden');
    } else {
        apiKeySection.classList.remove('hidden');
        appContent.classList.add('hidden');
    }
}

/**
 * Saves the API key to session storage and initializes the AI.
 */
function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (initializeAi(apiKey)) {
        sessionStorage.setItem('gemini-api-key', apiKey);
        toggleAppVisibility(true);
        // Load initial news after key is saved
        const initialPrompt = "오늘 주식 시장 주요 뉴스";
        searchInput.value = initialPrompt;
        fetchNews(initialPrompt);
    }
}

/**
 * Clears the API key from session storage and shows the input form.
 */
function clearApiKey() {
    sessionStorage.removeItem('gemini-api-key');
    ai = null;
    toggleAppVisibility(false);
    responseText.textContent = '';
    sourcesContainer.innerHTML = '';
    apiKeyInput.value = '';
}


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
    if (!ai) {
        alert("API 키가 설정되지 않았습니다. 키를 먼저 저장해주세요.");
        clearApiKey();
        return;
    }
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
        responseText.textContent = "뉴스 검색 중 오류가 발생했습니다. API 키가 유효한지 확인하거나 잠시 후 다시 시도해주세요.";
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

saveApiKeyButton.addEventListener('click', saveApiKey);
apiKeyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        saveApiKey();
    }
});
changeKeyButton.addEventListener('click', clearApiKey);

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    const savedApiKey = sessionStorage.getItem('gemini-api-key');
    if (savedApiKey) {
        if (initializeAi(savedApiKey)) {
            toggleAppVisibility(true);
            const initialPrompt = "오늘 주식 시장 주요 뉴스";
            searchInput.value = initialPrompt;
            fetchNews(initialPrompt);
        } else {
            // Saved key was invalid
            clearApiKey();
        }
    } else {
        toggleAppVisibility(false);
    }
});