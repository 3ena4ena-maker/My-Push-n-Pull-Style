export interface AnswerOption {
  text: string;
  type: 'S' | 'A' | 'V'; // S: 안정형, A: 불안형, V: 회피형
}

export interface Question {
  id: number;
  text: string;
  illustrationUrl: string; // 3D 일러스트 핫링크 URL
  illustrationAlt: string; // 이미지 alt
  options: AnswerOption[];
}

export interface ResultProfile {
  id: 'secure' | 'anxious' | 'avoidant' | 'fearful';
  title: string;
  subtitle: string;
  imageUrl: string;
  anxietyLevel: number; // 유리멘탈 지수%
  description: string;
  pushPullStyle: string; // 밀당 스타일 한줄평
  prescription: string; // 자존감 처방전
}

export interface CommunityPost {
  id: string;
  author: string;
  avatarId: string;
  text: string;
  styleTag: string;
  timestamp: string;
  likes: number;
}
