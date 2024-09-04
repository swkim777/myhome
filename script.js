// 모든 아이콘에 클릭 이벤트를 추가하여 내용을 보이거나 숨기는 기능 구현
const toggleIcons = document.querySelectorAll('.toggle-icon');

toggleIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const targetContent = document.getElementById(icon.dataset.target);
        
        if (targetContent.style.display === 'none' || targetContent.style.display === '') {
            targetContent.style.display = 'block';
        } else {
            targetContent.style.display = 'none';
        }
    });
});
