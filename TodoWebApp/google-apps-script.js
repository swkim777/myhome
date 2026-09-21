/**
 * ============================================================================
 * FocusMode TodoWebApp - Google Apps Script Backend
 * ============================================================================
 * 연동 구글 스프레드시트 ID: 1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f
 * 
 * [배포 및 권한 승인 방법 (★필독★)]
 * 1. 구글 스프레드시트(1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f) 열기
 * 2. 상단 메뉴 [확장 프로그램] > [Apps Script] 클릭
 * 3. 기존 코드를 모두 지우고 본 스크립트 전체를 복사하여 붙여넣기 후 [저장(💾)] 클릭
 * 4. ★드라이브 권한 승인 (가장 중요)★:
 *    - 상단 툴바의 함수 선택창에서 'authorizeDrive'를 선택하고 [실행(▶)] 클릭
 *    - (또는 구글 스프레드시트 화면의 상단 메뉴 [📁 Todo 드라이브 연동] > [1. Google Drive 권한 승인] 클릭)
 *    - '승인 필요' 팝업이 뜨면 [권한 검토] 클릭
 *    - 본인 구글 계정 선택 -> [고급] 클릭 -> [(안전하지 않음)으로 이동] 클릭 -> [허용] 클릭
 *    - 실행 로그에 '권한 승인 성공'이 뜨면 승인 완료!
 * 5. ★웹 앱 배포 (CORS/Failed to fetch 방지 필수 설정)★:
 *    - 우측 상단 파란색 [배포] > [배포 관리] 클릭 (처음 배포 시 [새 배포])
 *    - 좌측 상단 연필 아이콘(수정) 클릭
 *    - 버전: [새 버전] 선택
 *    - 다음 사용자 권한으로 실행: '나(내 계정)'
 *    - 액세스 권한이 있는 사용자: '모든 사용자(Anyone)' (★반드시 '모든 사용자'여야 웹에서 통신 가능)
 *    - [배포] 클릭 후 '웹 앱 URL' (https://script.google.com/macros/s/.../exec) 확인
 * 6. TodoWebApp 화면 우측 상단 설정(⚙️) 아이콘을 눌러 배포된 URL을 등록하면 연동 완료!
 * ============================================================================
 */

const SPREADSHEET_ID = "1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f";
const SHEET_NAME = "Todos";
const DRIVE_FOLDER_ID = "1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J";
const CSV_FILE_NAME = "todos.csv";

/**
 * 스프레드시트 열림 시 커스텀 메뉴 생성
 * 스프레드시트 상단 메뉴에서 클릭하여 간편하게 권한을 승인할 수 있습니다.
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu("📁 Todo 드라이브 연동")
      .addItem("1. Google Drive 권한 승인", "authorizeDrive")
      .addItem("2. todos.csv 읽기/쓰기 테스트", "testDriveReadWrite")
      .addToUi();
  } catch (e) {
    // 웹앱 실행 시 UI 예외 무시
  }
}

/**
 * ★ Google Drive 권한 승인 전용 함수 (try-catch 없음) ★
 * Apps Script 편집기 상단에서 'authorizeDrive'를 선택하고 [실행]을 누르면
 * Google Apps Script 런타임이 즉시 [권한 검토] 팝업창을 띄웁니다.
 */
function authorizeDrive() {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const name = folder.getName();
  Logger.log("✅ Google Drive 권한 승인 성공! 폴더명: " + name);
  return "권한 승인 완료: " + name;
}

/**
 * 지정된 구글 드라이브 폴더 객체를 반환합니다.
 * (권한 승인 팝업을 가로채지 않도록 try-catch를 사용하지 않습니다)
 */
function getDriveFolder() {
  return DriveApp.getFolderById(DRIVE_FOLDER_ID);
}

/**
 * 스프레드시트 및 'Todos' 시트 객체를 반환하며, 시트나 헤더가 없을 시 자동 생성합니다.
 */
function getOrCreateSheet() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (err) {
      // ignore openById error
    }
  }
  
  if (!ss) {
    throw new Error("스프레드시트를 열 수 없습니다. 구글 스프레드시트의 [확장 프로그램] > [Apps Script]에서 실행하거나 정확한 스프레드시트 ID를 확인해 주세요.");
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // 기본 헤더 생성
    sheet.appendRow(["ID", "할일내용", "완료여부", "생성일시(Timestamp),등록일자"]);
    // 헤더 스타일링
    const headerRange = sheet.getRange("A1:E1");
    headerRange.setBackground("#2563eb");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * GET 요청 처리:
 * - 기본 또는 source === "driveCsv": 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J)의 todos.csv 데이터를 읽어 반환합니다.
 * - source === "sheet": 구글 스프레드시트에 저장된 Todo 목록을 반환합니다.
 */
function doGet(e) {
  try {
    const source = (e && e.parameter && e.parameter.source) ? String(e.parameter.source) : "driveCsv";

    if (source === "sheet") {
      const sheet = getOrCreateSheet();
      const data = sheet.getDataRange().getValues();
      const todos = [];

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row[0] && !row[1]) continue;

        todos.push({
          id: String(row[0]),
          text: String(row[1] || ""),
          completed: Boolean(row[2] === true || String(row[2]).toLowerCase() === "true"),
          createdAt: Number(row[3]) || Date.now()
        });
      }

      return createJsonResponse({
        success: true,
        data: todos,
        source: "sheet"
      });
    }

    // 기본값: 구글 드라이브 폴더의 todos.csv 읽기
    const driveResult = getTodosFromDriveCsv();
    return createJsonResponse(driveResult);

  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * POST 요청 처리: Todo 추가, 수정, 삭제, 전체 동기화를 처리합니다.
 */
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    let payload = {};

    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const action = payload.action;
    const todo = payload.todo;
    const todoId = payload.id || (todo ? todo.id : null);

    const data = sheet.getDataRange().getValues();

    switch (action) {
      case "create": {
        if (!todo || !todo.id) {
          throw new Error("유효하지 않은 Todo 데이터입니다.");
        }
        // 이미 존재하는지 확인
        let existingRow = -1;
        for (let i = 1; i < data.length; i++) {
          if (String(data[i][0]) === String(todo.id)) {
            existingRow = i + 1;
            break;
          }
        }

        const dateStr = new Date(todo.createdAt || Date.now()).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

        if (existingRow > 0) {
          // 기존 항목 갱신
          sheet.getRange(existingRow, 2).setValue(todo.text);
          sheet.getRange(existingRow, 3).setValue(Boolean(todo.completed));
        } else {
          // 신규 추가
          sheet.appendRow([
            String(todo.id),
            todo.text,
            Boolean(todo.completed),
            Number(todo.createdAt || Date.now()),
            dateStr
          ]);
        }
        return createJsonResponse({ success: true, message: "일정이 추가/저장되었습니다." });
      }

      case "update": {
        if (!todoId) throw new Error("업데이트할 Todo ID가 필요합니다.");
        let targetRow = -1;
        for (let i = 1; i < data.length; i++) {
          if (String(data[i][0]) === String(todoId)) {
            targetRow = i + 1;
            break;
          }
        }
        if (targetRow === -1) {
          // 없으면 새로 추가
          const dateStr = new Date(todo.createdAt || Date.now()).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
          sheet.appendRow([
            String(todo.id),
            todo.text,
            Boolean(todo.completed),
            Number(todo.createdAt || Date.now()),
            dateStr
          ]);
        } else {
          if (todo.text !== undefined) sheet.getRange(targetRow, 2).setValue(todo.text);
          if (todo.completed !== undefined) sheet.getRange(targetRow, 3).setValue(Boolean(todo.completed));
        }
        return createJsonResponse({ success: true, message: "일정이 수정되었습니다." });
      }

      case "delete": {
        if (!todoId) throw new Error("삭제할 Todo ID가 필요합니다.");
        for (let i = data.length - 1; i >= 1; i--) {
          if (String(data[i][0]) === String(todoId)) {
            sheet.deleteRow(i + 1);
            break;
          }
        }
        return createJsonResponse({ success: true, message: "일정이 삭제되었습니다." });
      }

      case "clearCompleted": {
        // 완료된 항목 일괄 삭제
        for (let i = data.length - 1; i >= 1; i--) {
          const isCompleted = Boolean(data[i][2] === true || String(data[i][2]).toLowerCase() === "true");
          if (isCompleted) {
            sheet.deleteRow(i + 1);
          }
        }
        return createJsonResponse({ success: true, message: "완료된 일정이 삭제되었습니다." });
      }

      case "sync": {
        // 클라이언트 목록으로 전체 덮어쓰기 동기화
        const todos = payload.todos || [];
        // 기존 데이터 행 전체 삭제
        if (sheet.getLastRow() > 1) {
          sheet.deleteRows(2, sheet.getLastRow() - 1);
        }
        // 신규 데이터 행 추가
        if (todos.length > 0) {
          const rows = todos.map(t => [
            String(t.id),
            t.text,
            Boolean(t.completed),
            Number(t.createdAt || Date.now()),
            new Date(t.createdAt || Date.now()).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
          ]);
          sheet.getRange(2, 1, rows.length, 5).setValues(rows);
        }
        return createJsonResponse({ success: true, message: "전체 동기화가 완료되었습니다." });
      }

      case "saveToDriveCsv": {
        // 구글 드라이브에 todos.csv 파일 생성/갱신
        const todos = payload.todos || [];
        const fileInfo = saveTodosToDriveCsv(todos);
        return createJsonResponse({
          success: true,
          message: "구글 드라이브의 todos.csv 파일에 일정이 성공적으로 저장되었습니다.",
          fileUrl: fileInfo.fileUrl,
          fileId: fileInfo.fileId,
          updatedAt: fileInfo.updatedAt
        });
      }

      default:
        throw new Error("알 수 없는 action 요청입니다: " + action);
    }
  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * 따옴표와 쉼표를 고려하여 CSV 한 행을 안전하게 파싱합니다.
 */
function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (insideQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // 이스케이프된 이중 따옴표 건너뛰기
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

/**
 * 구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J) 내 todos.csv 파일을 읽어와 Todo 배열로 반환합니다.
 */
function getTodosFromDriveCsv() {
  const folder = getDriveFolder();
  const files = folder.getFilesByName(CSV_FILE_NAME);

  if (!files.hasNext()) {
    return {
      success: true,
      data: [],
      message: "지정된 드라이브 폴더에 todos.csv 파일이 아직 없습니다. 앱에서 'Save'를 누르면 자동 생성됩니다.",
      fileFound: false,
      folderId: DRIVE_FOLDER_ID
    };
  }

  const file = files.next();
  const content = file.getBlob().getDataAsString("UTF-8");
  const rawLines = content.split(/\r\n|\n|\r/);
  const lines = rawLines.filter(function(line) { return line.trim().length > 0; });

  const todos = [];
  // 1행이 헤더인 경우 건너뜁니다
  const startIndex = (lines.length > 0 && lines[0].toLowerCase().indexOf("id") !== -1) ? 1 : 0;

  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (!cols || cols.length === 0) continue;

    const id = String(cols[0] || "").trim();
    const text = String(cols[1] || "").trim();
    if (!id && !text) continue;

    const completed = String(cols[2] || "").toLowerCase() === "true" || String(cols[2] || "") === "1";
    let createdAt = Number(cols[3]);
    if (!createdAt || isNaN(createdAt)) {
      createdAt = Date.now();
    }

    todos.push({
      id: id || ("todo_" + Date.now() + "_" + i),
      text: text,
      completed: completed,
      createdAt: createdAt
    });
  }

  return {
    success: true,
    data: todos,
    fileId: file.getId(),
    fileUrl: file.getUrl(),
    folderId: DRIVE_FOLDER_ID,
    folderName: folder.getName(),
    count: todos.length,
    fileFound: true
  };
}

/**
 * 구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J) 내 todos.csv 파일로 일정을 저장/덮어씁니다.
 */
function saveTodosToDriveCsv(todos) {
  const folder = getDriveFolder();
  let csvRows = ["ID,할일내용,완료여부,생성일시(Timestamp),등록일자"];

  (todos || []).forEach(function(t) {
    const id = String(t.id || "");
    const safeText = '"' + String(t.text || "").replace(/"/g, '""') + '"';
    const completed = Boolean(t.completed);
    const timestamp = Number(t.createdAt || Date.now());
    const dateStr = new Date(timestamp).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    csvRows.push([id, safeText, completed, timestamp, dateStr].join(","));
  });

  const csvContent = csvRows.join("\r\n");

  let file;
  const files = folder.getFilesByName(CSV_FILE_NAME);
  if (files.hasNext()) {
    file = files.next();
    file.setContent(csvContent);
  } else {
    file = folder.createFile(CSV_FILE_NAME, csvContent, MimeType.CSV);
  }

  return {
    fileId: file.getId(),
    fileUrl: file.getUrl(),
    name: file.getName(),
    folderId: DRIVE_FOLDER_ID,
    folderName: folder.getName(),
    size: file.getSize(),
    updatedAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
  };
}

/**
 * JSON 응답 생성 헬퍼
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * [테스트용 함수] Google Drive 지정 폴더 권한 승인 및 읽기/쓰기 테스트
 * Apps Script 편집기 상단 툴바에서 'testDriveReadWrite' 함수를 선택하고 [실행] 버튼을 누르세요.
 * '승인 필요' 팝업에서 [권한 검토] -> 계정 선택 -> [고급] -> [이동(안전하지 않음)] -> [허용]을 차례로 누르면
 * 드라이브 폴더 접근 권한이 정식 승인되며, 지정 폴더 안에 todos.csv가 생성되고 읽어옵니다.
 */
function testDriveReadWrite() {
  Logger.log("1. 구글 드라이브 지정 폴더(1iOCkY5GlDNgul7V-rd3kpVOq0AFGYA-J) 접근 테스트...");
  const folder = getDriveFolder();
  Logger.log("-> 폴더명: " + folder.getName() + " (ID: " + folder.getId() + ")");

  Logger.log("2. 지정 폴더에 todos.csv 저장 테스트...");
  const sampleTodos = [
    { id: "101", text: "구글 드라이브 폴더 연동 일정 1", completed: false, createdAt: Date.now() },
    { id: "102", text: "구글 드라이브 폴더 연동 일정 2 (완료)", completed: true, createdAt: Date.now() }
  ];
  const saveRes = saveTodosToDriveCsv(sampleTodos);
  Logger.log("-> 저장 결과: " + JSON.stringify(saveRes));

  Logger.log("3. 지정 폴더의 todos.csv 읽기 테스트...");
  const readRes = getTodosFromDriveCsv();
  Logger.log("-> 읽어온 데이터 개수: " + (readRes.data ? readRes.data.length : 0));
  Logger.log("-> 읽기 결과: " + JSON.stringify(readRes));

  return { saveRes: saveRes, readRes: readRes };
}

function testDriveSave() {
  return testDriveReadWrite();
}


