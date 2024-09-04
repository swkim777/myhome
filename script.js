// 전역 변수 설정
let currentCategory = 'tech';
let posts = {
    tech: [],
    daily: [],
    interest: [],
    travel: []
};

// localStorage에서 데이터 불러오기
window.onload = function() {
    if(localStorage.getItem('posts')) {
        posts = JSON.parse(localStorage.getItem('posts'));
        updatePostList();
    }
};

// 카테고리 탭 전환 기능
const tabButtons = document.querySelectorAll('.tab-button');
const categoryContents = document.querySelectorAll('.category-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 활성화된 탭 변경
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 활성화된 컨텐츠 변경
        categoryContents.forEach(content => content.classList.remove('active'));
        document.getElementById(button.dataset.category).classList.add('active');

        currentCategory = button.dataset.category;
        updatePostList();
    });
});

// 모달 관련 요소들
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-button');
const saveButton = document.getElementById('save-button');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');

// 현재 수정 중인 포스트 인덱스
let editIndex = null;

// 모달 열기
function openModal(isEdit = false) {
    modal.classList.remove('hidden');
    if(!isEdit) {
        postTitleInput.value = '';
        postContentInput.value = '';
        editIndex = null;
    }
}

// 모달 닫기
function closeModal() {
    modal.classList.add('hidden');
}

// 모달 닫기 이벤트 리스너
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if(e.target == modal) {
        closeModal();
    }
});

// 입력 버튼 클릭 이벤트
const addButtons = document.querySelectorAll('.add-button');
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        openModal();
    });
});

// 저장 버튼 클릭 이벤트
saveButton.addEventListener('click', () => {
    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();

    if(title && content) {
        if(editIndex !== null) {
            // 수정 모드
            posts[currentCategory][editIndex] = { title, content };
            editIndex = null;
        } else {
            // 새 포스트 추가
            posts[currentCategory].push({ title, content });
        }
        saveToLocalStorage();
        updatePostList();
        closeModal();
    } else {
        alert('제목과 내용을 모두 입력해주세요.');
    }
});

// 포스트 리스트 업데이트
function updatePostList() {
    const postList = document.querySelector(`#${currentCategory} .post-list`);
    postList.innerHTML = '';

    posts[currentCategory].forEach((post, index) => {
        const li = document.createElement('li');
        li.classList.add('post-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = index;

        const title = document.createElement('h4');
        title.textContent = post.title;

        const content = document.createElement('p');
        content.textContent = post.content;

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(content);

        postList.appendChild(li);
    });
}

// 로컬 스토리지에 저장
function saveToLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// 삭제 버튼 클릭 이벤트
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll(`#${currentCategory} .post-item input[type="checkbox"]:checked`);
        const indexesToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));

        if(indexesToDelete.length > 0) {
            posts[currentCategory] = posts[currentCategory].filter((_, index) => !indexesToDelete.includes(index));
            saveToLocalStorage();
            updatePostList();
        } else {
            alert('삭제할 포스트를 선택해주세요.');
        }
    });
});

// 수정 버튼 클릭 이벤트
const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll(`#${currentCategory} .post-item input[type="checkbox"]:checked`);
        if(checkboxes.length === 1) {
            editIndex = parseInt(checkboxes[0].dataset.index);
            const post = posts[currentCategory][editIndex];
            postTitleInput.value = post.title;
            postContentInput.value = post.content;
            openModal(true);
        } else if(checkboxes.length === 0) {
            alert('수정할 포스트를 선택해주세요.');
        } else {
            alert('한 번에 하나의 포스트만 수정할 수 있습니다.');
        }
    });
});
