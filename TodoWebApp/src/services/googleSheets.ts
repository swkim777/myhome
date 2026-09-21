/**
 * @file googleSheets.ts
 * @description Google Sheets (1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f) 동기화 서비스.
 * Google Apps Script Web App 엔드포인트를 통해 데이터를 비동기로 주고받습니다.
 */
import { Todo } from '../types/todo';

export const SPREADSHEET_ID = "1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f";
export const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
export const DRIVE_FOLDER_ID = "1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J";
export const DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwxtgN6M6hi5MWvWof_0e7C6PNyKbYMHw9Abh9vsDB0/exec";
const APPS_SCRIPT_STORAGE_KEY = 'todo_apps_script_url';

/**
 * 저장된 Google Apps Script 배포 URL을 가져옵니다.
 */
export function getAppsScriptUrl(): string {
  return localStorage.getItem(APPS_SCRIPT_STORAGE_KEY) || DEFAULT_APPS_SCRIPT_URL;
}

/**
 * Google Apps Script 배포 URL을 저장합니다.
 */
export function setAppsScriptUrl(url: string): void {
  const trimmed = url.trim();
  if (trimmed) {
    localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(APPS_SCRIPT_STORAGE_KEY);
  }
}

/**
 * Google Apps Script 연결 상태를 테스트합니다.
 */
export async function testAppsScriptConnection(url: string): Promise<{ success: boolean; message: string; count?: number }> {
  const targetUrl = url.trim();
  if (!targetUrl) {
    return { success: false, message: 'Google Apps Script 웹 앱 URL을 입력해 주세요.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return { success: false, message: `서버 응답 오류 (HTTP ${response.status})` };
    }

    const json = await response.json();
    if (json.success && Array.isArray(json.data)) {
      return { 
        success: true, 
        message: `연결 성공! 구글 시트에서 ${json.data.length}개의 일정을 확인했습니다.`,
        count: json.data.length
      };
    } else {
      return { success: false, message: json.error || '응답 데이터 형식이 올바르지 않습니다.' };
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { success: false, message: '연결 시간이 초과되었습니다 (8초). URL을 다시 확인해 주세요.' };
    }
    return { success: false, message: `연결 실패: ${error.message || '네트워크 오류 또는 권한 설정 문제'}` };
  }
}

/**
 * 구글 시트에서 전체 Todo 목록을 불러옵니다.
 */
export async function fetchTodosFromSheet(): Promise<{ success: boolean; data: Todo[]; count: number; message?: string }> {
  const url = getAppsScriptUrl();
  if (!url) {
    return { success: false, data: [], count: 0, message: 'Google Apps Script URL이 설정되지 않았습니다.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const separator = url.includes('?') ? '&' : '?';
    const targetUrl = `${url}${separator}source=sheet&_t=${Date.now()}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      return {
        success: true,
        data: result.data as Todo[],
        count: result.data.length,
        message: result.message || `구글 시트(Todos)에서 ${result.data.length}개의 일정을 불러왔습니다.`
      };
    }
    return {
      success: false,
      data: [],
      count: 0,
      message: result.error || '구글 시트에서 데이터를 불러오지 못했습니다.'
    };
  } catch (err: any) {
    console.warn('[GoogleSheets] 구글 시트 일정 불러오기 실패:', err);
    return {
      success: false,
      data: [],
      count: 0,
      message: `구글 시트 불러오기 실패: ${err?.message || '네트워크 오류'}`
    };
  }
}

/**
 * 구글 시트에 새 Todo를 추가합니다.
 */
export async function addTodoToSheet(todo: Todo): Promise<boolean> {
  return sendPostRequest({ action: 'create', todo });
}

/**
 * 구글 시트의 Todo를 업데이트합니다.
 */
export async function updateTodoInSheet(todo: Todo): Promise<boolean> {
  return sendPostRequest({ action: 'update', id: todo.id, todo });
}

/**
 * 구글 시트에서 특정 Todo를 삭제합니다.
 */
export async function deleteTodoFromSheet(id: string): Promise<boolean> {
  return sendPostRequest({ action: 'delete', id });
}

/**
 * 구글 시트에서 완료된 Todo들을 삭제합니다.
 */
export async function clearCompletedFromSheet(): Promise<boolean> {
  return sendPostRequest({ action: 'clearCompleted' });
}

/**
 * 전체 Todo 목록을 구글 시트와 덮어쓰기 동기화합니다.
 * (기존 시트 데이터 전체 삭제 후 현재 목록 쓰기)
 */
export async function syncAllTodosToSheet(todos: Todo[]): Promise<{ 
  success: boolean; 
  message: string; 
  sheetUrl?: string; 
  count?: number; 
}> {
  const url = getAppsScriptUrl();
  if (!url) {
    return { success: false, message: 'Google Apps Script URL이 설정되지 않았습니다. 상단 설정에서 등록해 주세요.' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'sync', todos }),
    });

    if (!response.ok) {
      return { success: false, message: `서버 응답 오류 (HTTP ${response.status})` };
    }

    const result = await response.json();
    return {
      success: Boolean(result.success),
      message: result.message || (result.success ? '구글 시트에 성공적으로 덮어써서 저장했습니다.' : '저장 실패'),
      sheetUrl: result.sheetUrl || SPREADSHEET_URL,
      count: result.count !== undefined ? result.count : todos.length
    };
  } catch (err: any) {
    console.error('[GoogleSheets] 전체 동기화 저장 실패:', err);
    const msg = String(err?.message || '');
    return {
      success: false,
      message: msg.includes('Failed to fetch')
        ? 'Google Apps Script 연결 실패 (Failed to fetch). Apps Script 배포 상태를 확인해 주세요.'
        : `저장 실패: ${msg}`,
      sheetUrl: SPREADSHEET_URL
    };
  }
}

/**
 * Google Apps Script Web App으로 안전하게 POST 요청을 전송합니다.
 * (CORS Preflight 방지를 위해 text/plain 헤더로 JSON 전송)
 */
async function sendPostRequest(payload: any): Promise<boolean> {
  const url = getAppsScriptUrl();
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return Boolean(result.success);
  } catch (err) {
    console.warn('[GoogleSheets] POST 전송 실패:', err);
    return false;
  }
}

/**
 * 구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J)의 todos.csv 파일에서 일정 목록을 불러옵니다.
 */
export async function fetchTodosFromDriveCsv(): Promise<{
  success: boolean;
  data: Todo[];
  message?: string;
  fileUrl?: string;
  fileFound?: boolean;
}> {
  const url = getAppsScriptUrl();
  if (!url) {
    return {
      success: false,
      data: [],
      message: 'Apps Script URL이 설정되지 않았습니다.',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const separator = url.includes('?') ? '&' : '?';
    const targetUrl = `${url}${separator}source=driveCsv&_t=${Date.now()}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      return {
        success: true,
        data: result.data as Todo[],
        message: result.message,
        fileUrl: result.fileUrl,
        fileFound: result.fileFound,
      };
    }
    return {
      success: false,
      data: [],
      message: result.error || result.message || '데이터를 불러오지 못했습니다.',
    };
  } catch (err: any) {
    console.warn('[GoogleSheets] Drive todos.csv 로드 실패:', err);
    const msg = String(err?.message || '');
    return {
      success: false,
      data: [],
      message: msg.includes('Failed to fetch')
        ? '구글 드라이브 연결 실패 (Failed to fetch). Apps Script 배포 설정([액세스 권한: 모든 사용자]) 및 드라이브 접근 승인을 확인해 주세요.'
        : `로드 실패: ${msg}`,
    };
  }
}

/**
 * 구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J)의 todos.csv 파일로 현재 일정을 저장/반영합니다.
 */
export async function saveTodosToDriveCsv(todos: Todo[]): Promise<{ 
  success: boolean; 
  message: string; 
  fileUrl?: string; 
  folderUrl?: string;
  folderName?: string;
}> {
  const url = getAppsScriptUrl();
  if (!url) {
    return { success: false, message: 'Google Apps Script URL이 설정되지 않았습니다. 상단 설정에서 등록해 주세요.' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ 
        action: 'saveToDriveCsv', 
        todos,
        folderId: DRIVE_FOLDER_ID 
      }),
    });

    if (!response.ok) {
      return { success: false, message: `서버 응답 오류 (HTTP ${response.status})` };
    }

    const result = await response.json();
    return {
      success: Boolean(result.success),
      message: result.message || (result.success ? '구글 드라이브 폴더의 todos.csv에 저장되었습니다.' : '저장 실패'),
      fileUrl: result.fileUrl,
      folderUrl: result.folderUrl || `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`,
      folderName: result.folderName || '지정 폴더'
    };
  } catch (err: any) {
    console.error('[GoogleSheets] Drive CSV 저장 실패:', err);
    const msg = String(err?.message || '');
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
      return { 
        success: false, 
        message: 'Google Apps Script 연결 실패 (Failed to fetch). 구글 시트의 [Apps Script]에서 최신 코드를 붙여넣은 뒤, [testDriveReadWrite] 함수 실행으로 드라이브 권한을 승인하고 [액세스 권한: 모든 사용자(Anyone)]로 새 버전을 배포해 주세요.' 
      };
    }
    return { success: false, message: `저장 실패: ${msg || '네트워크 오류'}` };
  }
}
