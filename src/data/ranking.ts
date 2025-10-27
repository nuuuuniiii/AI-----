export interface BreadPilgrimRanking {
  id: string;
  nickname: string;
  profileImage: string;
  reviewCount: number;
  level: string;
  region: string;
  totalCourses: number;
  totalRecommendations: number;
  lastActiveAt: string;
  rank: number;
  badge?: string;
  isOnline?: boolean;
}

export const breadPilgrimRankingData: BreadPilgrimRanking[] = [
  {
    id: "user_001",
    nickname: "김밥천국",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    reviewCount: 119,
    level: "빵지순례 마스터",
    region: "서울",
    totalCourses: 12,
    totalRecommendations: 89,
    lastActiveAt: "2024-01-20T14:22:00Z",
    rank: 1,
    badge: "👑",
    isOnline: true
  },
  {
    id: "user_002",
    nickname: "빵의 정석",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    reviewCount: 101,
    level: "빵지순례 전문가",
    region: "부산",
    totalCourses: 10,
    totalRecommendations: 67,
    lastActiveAt: "2024-01-20T12:15:00Z",
    rank: 2,
    badge: "🥇",
    isOnline: false
  },
  {
    id: "user_003",
    nickname: "달콤한 하루",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    reviewCount: 95,
    level: "빵지순례 전문가",
    region: "대구",
    totalCourses: 8,
    totalRecommendations: 54,
    lastActiveAt: "2024-01-20T10:30:00Z",
    rank: 3,
    badge: "🥈",
    isOnline: true
  },
  {
    id: "user_004",
    nickname: "바게뜨 매니아",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    reviewCount: 88,
    level: "빵지순례 중급자",
    region: "인천",
    totalCourses: 6,
    totalRecommendations: 42,
    lastActiveAt: "2024-01-19T18:45:00Z",
    rank: 4,
    badge: "🥉",
    isOnline: false
  },
  {
    id: "user_005",
    nickname: "케이크무스",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    reviewCount: 82,
    level: "빵지순례 중급자",
    region: "광주",
    totalCourses: 5,
    totalRecommendations: 38,
    lastActiveAt: "2024-01-19T16:20:00Z",
    rank: 5,
    isOnline: true
  },
  {
    id: "user_006",
    nickname: "막가롱",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    reviewCount: 78,
    level: "빵지순례 초급자",
    region: "대전",
    totalCourses: 4,
    totalRecommendations: 31,
    lastActiveAt: "2024-01-19T14:10:00Z",
    rank: 6,
    isOnline: false
  },
  {
    id: "user_007",
    nickname: "두바이초코",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    reviewCount: 75,
    level: "빵지순례 초급자",
    region: "울산",
    totalCourses: 3,
    totalRecommendations: 25,
    lastActiveAt: "2024-01-19T11:30:00Z",
    rank: 7,
    isOnline: true
  },
  {
    id: "user_008",
    nickname: "크로와상러버",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    reviewCount: 72,
    level: "빵지순례 초급자",
    region: "세종",
    totalCourses: 2,
    totalRecommendations: 19,
    lastActiveAt: "2024-01-18T20:15:00Z",
    rank: 8,
    isOnline: false
  },
  {
    id: "user_009",
    nickname: "소금빵매니아",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    reviewCount: 68,
    level: "빵지순례 초급자",
    region: "제주",
    totalCourses: 1,
    totalRecommendations: 14,
    lastActiveAt: "2024-01-18T15:45:00Z",
    rank: 9,
    isOnline: true
  },
  {
    id: "user_010",
    nickname: "빵순례시작",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    reviewCount: 65,
    level: "빵지순례 초급자",
    region: "강원",
    totalCourses: 1,
    totalRecommendations: 9,
    lastActiveAt: "2024-01-18T12:00:00Z",
    rank: 10,
    isOnline: false
  }
];

export const getRankingByRegion = (region: string) => {
  return breadPilgrimRankingData.filter(user => user.region === region);
};

export const getTopRankers = (limit: number = 10) => {
  return breadPilgrimRankingData.slice(0, limit);
};

export const getOnlineUsers = () => {
  return breadPilgrimRankingData.filter(user => user.isOnline);
};
