'use client';

import { userRankingData } from '@/data/user-ranking';
import RankingRow from '@/components/RankingRow';
import GNB from '@/components/GNB';
import TabNavigation from '@/components/TabNavigation';

export default function ExplorePage() {
  const tabItems = [
    { label: 'Home', href: '/' },
    { label: 'Others', href: '/explore', active: true },
    { label: 'My Map', href: '/my-map' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* GNB */}
      <GNB />
      
      {/* Tab Navigation */}
      <TabNavigation items={tabItems} />

      {/* Content */}
      <div className="flex flex-col gap-[26px] items-start pb-[75px] pt-[23px] px-0 relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-0 relative w-full">
          <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
            <h1 className="font-['Bagel_Fat_One',_sans-serif] relative text-[50px] text-[#50392b] uppercase w-full">
              다른 빵지순례자
            </h1>
            <p className="font-['Pretendard',_sans-serif] font-semibold relative text-[18px] text-[#dabea6] w-full">
              가장 많은 리뷰를 남긴 빵지순례자들을 만나보세요!
            </p>
          </div>
          <div className="h-[56px] w-[375px]" />
        </div>

        {/* Ranking List */}
        <div className="flex flex-col items-center justify-center px-[70px] py-0 relative w-full">
          {userRankingData.map((user) => (
            <div key={user.id} className="flex gap-[40px] items-start relative w-[1375.67px]">
              <RankingRow user={user} />
            </div>
          ))}
          <div className="h-[84px] w-full" />
        </div>
      </div>
    </div>
  );
}
