'use client';

import { useState } from 'react';
import { breadPilgrimRankingData, getRankingByRegion, getOnlineUsers } from '@/data/ranking';
import BreadPilgrimRankingCard from '@/components/BreadPilgrimRankingCard';
import BreadPilgrimRankingRow from '@/components/BreadPilgrimRankingRow';
import TabNavigation from '@/components/TabNavigation';
import GNB from '@/components/GNB';

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'region'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');

  const regions = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '제주', '강원'];

  const getFilteredData = () => {
    switch (activeTab) {
      case 'online':
        return getOnlineUsers();
      case 'region':
        return selectedRegion === '전체' 
          ? breadPilgrimRankingData 
          : getRankingByRegion(selectedRegion);
      default:
        return breadPilgrimRankingData;
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* GNB */}
      <GNB />
      
      {/* Header */}
      <div className="flex items-end justify-between px-[70px] py-[0px] relative w-full">
        <div className="flex flex-col items-start w-[337px]">
          <div className="h-[70px] relative w-full">
            <h1 className="absolute font-normal text-[50px] text-[#50392b] uppercase leading-[140%] top-0 left-0 w-[337px] font-bagel-fat-one">
              다른 빵지순례자
            </h1>
          </div>
          <div className="h-[25px] relative w-full">
            <p className="absolute font-semibold text-[18px] text-[#dabea6] leading-[140%] top-0 left-0 w-[337px]">
              가장 많은 리뷰를 남긴 빵지순례자들을 만나보세요!
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <TabNavigation
          tabs={[
            { id: 'all', label: '전체 랭킹' },
            { id: 'online', label: '온라인' },
            { id: 'region', label: '지역별' }
          ]}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as 'all' | 'online' | 'region')}
        />

        {/* Region Filter for region tab */}
        {activeTab === 'region' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-sm font-pretendard-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-[#8B4513] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Top 3 Cards */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <h2 className="text-xl font-pretendard-semibold text-[#333333] mb-4">🏆 TOP 3</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredData.slice(0, 3).map((user) => (
            <BreadPilgrimRankingCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* Ranking List */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-pretendard-semibold text-[#333333] mb-4">
          {activeTab === 'online' ? '🟢 온라인 빵지순례자' : 
           activeTab === 'region' ? `📍 ${selectedRegion} 지역 랭킹` : 
           '📊 전체 랭킹'}
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {filteredData.map((user, index) => (
            <BreadPilgrimRankingRow 
              key={user.id} 
              user={user} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer spacing */}
      <div className="h-8"></div>
    </div>
  );
}
