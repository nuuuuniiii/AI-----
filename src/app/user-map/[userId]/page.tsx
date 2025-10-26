'use client';

import { useParams } from 'next/navigation';
import { userRankingData } from '@/data/user-ranking';

export default function UserMapPage() {
  const params = useParams();
  const userId = params.userId as string;
  
  const user = userRankingData.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <h1 className="text-[#473327] text-[24px]">사용자를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#473327] h-[90px] flex items-center justify-between px-8">
        <h1 className="text-white text-[32px] font-bold" style={{ fontFamily: 'BagelFatOne, cursive' }}>
          {user.nickname}의 빵지순례
        </h1>
        <div className="text-white text-[18px]">
          리뷰 {user.reviewCount}개
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-[#9a8779] rounded-[20px] p-8 text-center">
          <h2 className="text-white text-[24px] font-bold mb-4">
            {user.nickname}님의 빵지순례 지도
          </h2>
          <p className="text-white/80 text-[16px]">
            현재 {user.reviewCount}개의 빵집을 방문하셨습니다.
          </p>
          <div className="mt-8 text-white/60">
            <p>지도 기능은 곧 추가될 예정입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
