
import { Inspiration, GenerationMode, PromptTemplate } from './types';

export const INSPIRATIONS: Inspiration[] = [
  {
    title: '실사풍 장면',
    description: '사진 용어를 사용하여 사실적인 이미지를 만듭니다. 카메라 각도, 렌즈, 조명을 언급하세요.',
    prompt: '고급 일본 도예가가 어두운 작업장에서 점토를 빚고 있는 모습을 담은 사실적인 클로즈업 인물 사진. 따뜻한 램프 조명이 그의 손과 얼굴의 디테일을 강조합니다. 50mm 렌즈로 촬영.',
    mode: GenerationMode.TextToImage,
    imagePlaceholders: 0,
  },
  {
    title: '스티커 및 일러스트',
    description: '스타일을 명시하고 투명한 배경을 요청하여 스티커나 아이콘을 만듭니다.',
    prompt: '작은 대나무 모자를 쓴 행복한 붉은 판다의 귀여운 스타일 스티커. 투명한 배경.',
    mode: GenerationMode.TextToImage,
    imagePlaceholders: 0,
  },
  {
    title: '로고 디자인',
    description: '텍스트, 글꼴 스타일, 전체 디자인을 명확하게 설명하여 로고를 생성합니다.',
    prompt: "'The Daily Grind'라는 커피숍을 위한 현대적이고 미니멀한 로고. 원 안에 깔끔한 산세리프 글꼴을 사용합니다.",
    mode: GenerationMode.TextToImage,
    imagePlaceholders: 0,
  },
  {
    title: '요소 추가/제거 (이미지 편집)',
    description: '이미지를 제공하고 변경 사항을 설명하여 요소를 추가하거나 제거합니다.',
    prompt: '제공된 내 고양이 이미지에 작고 뜨개질된 마법사 모자를 추가해주세요.',
    mode: GenerationMode.ImageAndText,
    imagePlaceholders: 1,
  },
  {
    title: '스타일 변환',
    description: '입력 이미지를 제공하고 다른 예술적 스타일로 다시 렌더링하도록 요청합니다.',
    prompt: '제공된 현대 도시의 밤거리 사진을 빈센트 반 고흐의 "별이 빛나는 밤" 스타일로 변환해주세요.',
    mode: GenerationMode.ImageAndText,
    imagePlaceholders: 1,
  },
  {
    title: '고급 합성 (여러 이미지)',
    description: '여러 이미지를 컨텍스트로 제공하여 새로운 합성 장면을 만듭니다.',
    prompt: '전문적인 이커머스 패션 사진을 만들어 주세요. 파란색 꽃무늬 드레스 이미지를 가져와 모델 이미지에 입혀주세요. 배경은 부드럽고 흐릿한 정원으로 설정해주세요.',
    mode: GenerationMode.MultiImage,
    imagePlaceholders: 2,
  },
];

export const PROMPT_TEMPLATES: Record<GenerationMode, PromptTemplate[]> = {
  [GenerationMode.TextToImage]: [
    {
      title: '캐릭터 생성',
      template: '클로즈업 초상화, [캐릭터 설명], [의상], [배경], [조명 스타일], [카메라 뷰], 하이퍼 디테일, 영화 같은 조명, 스튜디오 품질',
    },
    {
      title: '스티커 디자인',
      template: '[주제]의 귀여운 치비 스타일 스티커, 흰색 윤곽선, 투명한 배경, 벡터 그래픽',
    },
    {
      title: '음식 사진',
      template: '음식 사진, [요리 이름], 김이 모락모락 피어나는, [접시/그릇]에 담긴, [토핑]을 곁들인, 따뜻한 조명, 클로즈업, 매우 디테일함',
    },
  ],
  [GenerationMode.ImageAndText]: [
    {
      title: '배경 변경',
      template: '제공된 이미지의 배경을 [새로운 배경 설명]으로 변경해주세요.',
    },
    {
      title: '객체 추가',
      template: '제공된 이미지에 [추가할 객체 설명]을 추가해주세요.',
    },
    {
      title: '스타일 변환',
      template: '제공된 이미지를 [예: 픽사 애니메이션, 수채화, 사이버펑크] 스타일로 변환해주세요.',
    },
  ],
  [GenerationMode.MultiImage]: [
    {
      title: '얼굴 교체',
      template: '첫 번째 이미지의 얼굴을 두 번째 이미지의 사람에게 적용해주세요.',
    },
    {
      title: '의상 교체',
      template: '첫 번째 이미지의 의상을 두 번째 이미지의 모델에게 입혀주세요.',
    },
    {
      title: '장면 합성',
      template: '첫 번째 이미지의 [객체]를 두 번째 이미지의 [배경/장면]에 자연스럽게 합성해주세요.',
    },
  ],
};
