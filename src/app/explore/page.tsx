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
      <div className="bg-white w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-[23px] relative w-full">
          <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
            <h1 className="font-bagel-fat-one relative text-[50px] text-[#50392b] uppercase w-full">
              다른 빵지순례자
            </h1>
            <p className="font-pretendard-medium relative text-[18px] text-[#dabea6] w-full whitespace-nowrap">
              가장 많은 리뷰를 남긴 빵지순례자들을 만나보세요!
            </p>
          </div>
        </div>

        {/* Ranking Grid */}
        <div className="px-[70px] pb-[75px]">
          <div className="grid grid-cols-1 gap-[16px] w-full">
            {userRankingData.map((user) => (
              <div key={user.id} className="flex items-center justify-between relative w-full">
                <RankingRow user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
