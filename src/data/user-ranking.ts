export interface UserRanking {
  id: string;
  nickname: string;
  reviewCount: number;
  rank: number;
}

export const userRankingData: UserRanking[] = [
  {
    id: "user1",
    nickname: "김밥천국",
    reviewCount: 119,
    rank: 1
  },
  {
    id: "user2", 
    nickname: "빵의 정석",
    reviewCount: 101,
    rank: 2
  },
  {
    id: "user3",
    nickname: "달콤한 하루",
    reviewCount: 99,
    rank: 3
  },
  {
    id: "user4",
    nickname: "바게뜨 매니아",
    reviewCount: 89,
    rank: 4
  },
  {
    id: "user5",
    nickname: "케이크무스",
    reviewCount: 87,
    rank: 5
  },
  {
    id: "user6",
    nickname: "막가롱",
    reviewCount: 84,
    rank: 6
  },
  {
    id: "user7",
    nickname: "두바이초코",
    reviewCount: 78,
    rank: 7
  }
];
