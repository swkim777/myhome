/**
 * ============================================================================
 * FocusMode TodoWebApp - Google Apps Script Backend
 * ============================================================================
 * 연동 구글 스프레드시트 ID: 1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f
 * 
 * [배포 방법]
 * 1. 구글 스프레드시트(1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f) 열기
 * 2. 상단 메뉴 [확장 프로그램] > [Apps Script] 클릭
 * 3. 기존 코드를 모두 지우고 본 스크립트 전체를 복사하여 붙여넣기
 * 4. 상단 [저장] 아이콘 클릭
 * 5. 우측 상단 파란색 [배포] > [새 배포] 클릭
 * 6. 유형 선택(톱니바퀴) > [웹 앱] 선택
 * 7. 설정:
 *    - 설명: Todo WebApp API
 *    - 다음 사용자 권한으로 실행: '나(내 계정)'
 *    - 액세스 권한이 있는 사용자: '모든 사용자(Anyone)' (★매우 중요★)
 * 8. [배포] 클릭 후 '웹 앱 URL' (https://script.google.com/macros/s/.../exec) 복사
 * 9. TodoWebApp의 '동기화 설정'에 해당 URL을 입력하면 실시간 동기화 완료!
 * ============================================================================
 */

const SPREADSHEET_ID = "1O_ze8NwS2YGQ-7KiX2zWG21WXYSuVQ-f";
const SHEET_NAME = "Todos";

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
    sheet.appendRow(["ID", "할일내용", "완료여부", "생성일시(Timestamp)", "등록일자"]);
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
 * GET 요청 처리: 구글 시트에 저장된 모든 Todo 목록을 JSON으로 반환합니다.
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const todos = [];

    // 1행은 헤더이므로 2행(인덱스 1)부터 시작
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[0] && !row[1]) continue; // 빈 행 건너뛰기

      todos.push({
        id: String(row[0]),
        text: String(row[1] || ""),
        completed: Boolean(row[2] === true || String(row[2]).toLowerCase() === "true"),
        createdAt: Number(row[3]) || Date.now()
      });
    }

    return createJsonResponse({
      success: true,
      data: todos
    });
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
 * JSON 응답 생성 헬퍼
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
