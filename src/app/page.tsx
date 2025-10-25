'use client';

import Link from 'next/link';
import CTAButton from '@/components/CTAButton';

export default function Home() {
  return (
    <div className="flex flex-col items-start relative w-full min-h-screen">
      {/* GNB */}
      <div className="bg-[#473327] h-[90px] relative w-full flex items-center justify-between px-[34px]">
        {/* Logo */}
        <div className="flex items-center gap-[6px]">
          <img 
            src="/images/breadroad main logo.png" 
            alt="Bread Logo" 
            className="h-[40px] w-auto object-contain"
          />
          <p className="text-white text-[24px] font-normal leading-[140%] whitespace-nowrap" style={{ fontFamily: 'BagelFatOne, cursive', color: '#FFFF', fontWeight: 400 }}>
            빵지순례
          </p>
        </div>

        {/* Search Input */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-white rounded-[100px] px-[20px] py-[8.5px] h-[57px] w-[850px] flex items-center justify-between">
          <p className="font-medium text-[18px] text-[#d3ccc6] whitespace-nowrap">
            맛있는 빵을 검색해보세요
          </p>
          <div className="bg-[#473327] rounded-[30px] w-[41px] h-[40px] flex items-center justify-center">
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="41" height="40" rx="20" fill="#473327"/>
              <path d="M18 24C16.1833 24 14.646 23.3707 13.388 22.112C12.13 20.8533 11.5007 19.316 11.5 17.5C11.4993 15.684 12.1287 14.1467 13.388 12.888C14.6473 11.6293 16.1847 11 18 11C19.8153 11 21.353 11.6293 22.613 12.888C23.873 14.1467 24.502 15.684 24.5 17.5C24.5 18.2333 24.3833 18.925 24.15 19.575C23.9167 20.225 23.6 20.8 23.2 21.3L28.8 26.9C28.9833 27.0833 29.075 27.3167 29.075 27.6C29.075 27.8833 28.9833 28.1167 28.8 28.3C28.6167 28.4833 28.3833 28.575 28.1 28.575C27.8167 28.575 27.5833 28.4833 27.4 28.3L21.8 22.7C21.3 23.1 20.725 23.4167 20.075 23.65C19.425 23.8833 18.7333 24 18 24ZM18 22C19.25 22 20.3127 21.5627 21.188 20.688C22.0633 19.8133 22.5007 18.7507 22.5 17.5C22.4993 16.2493 22.062 15.187 21.188 14.313C20.314 13.439 19.2513 13.0013 18 13C16.7487 12.9987 15.6863 13.4363 14.813 14.313C13.9397 15.1897 13.502 16.252 13.5 17.5C13.498 18.748 13.9357 19.8107 14.813 20.688C15.6903 21.5653 16.7527 22.0027 18 22Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-[8px]">
          <p className="font-semibold text-[15px] text-white opacity-70 whitespace-nowrap">
            Hyegyo Lee
          </p>
          <div className="size-[28px] rounded-full overflow-hidden bg-white flex items-center justify-center">
            <div className="size-[20px] bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute left-[30px] top-1/2 -translate-y-1/2 flex items-center gap-[8px]">
          <button className="bg-[rgba(255,255,255,0.15)] rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white">Home</p>
          </button>
          <button className="rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white/50">Others</p>
          </button>
          <Link href="/my-map" className="rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white/50">My Map</p>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white w-full">
        <div className="flex flex-col items-center gap-[0px] py-[64px] px-4">
          {/* Main Title */}
          <h1 className="text-[120px] md:text-[179px] text-[#50392b] text-center uppercase w-full leading-[140%]" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
            Road To Bread
          </h1>

          <div className="flex flex-col items-center gap-[64px] mt-[64px] w-full max-w-[1512px]">
            {/* Main Icon Image */}
            <div className="flex items-end relative">
              <img
                src="/images/main-bread.png"
                alt="Main bread"
                className="h-[385px] w-[584px] object-cover"
              />
              <img
                src="/images/Pin.png"
                alt="Pin"
                className="h-[112.872px] w-[96.749px] object-contain"
              />
            </div>
            
            {/* CTA Buttons */}
            <div className="w-full flex justify-start pl-[70px] pr-[1203px]">
              <div className="flex flex-col gap-[7px] items-end w-[239px]">
                <CTAButton
                  text="다른 빵지순례자 보기"
                  href="/explore"
                  variant="primary"
                />
                <CTAButton
                  text="내 빵지순례지"
                  href="/my-map"
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="bg-[#473327] w-full py-[48px] px-[70px] pb-[114px]">
        <div className="max-w-7xl mx-auto flex flex-col gap-[74px]">
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-[30px] text-white tracking-[-0.75px] uppercase" style={{ fontFamily: 'Helvetica Neue, Noto Sans KR', fontWeight: 700 }}>
            이번달 인기 빵지순례코스
          </h2>
            <p className="font-semibold text-[18px] text-[#9a8779]">
            매달 1일부터 가장 추천 많은 순위로 정해져요
          </p>
        </div>

          {/* Rank Cards */}
          <div className="flex gap-[96px] items-center justify-center flex-wrap">
          <RankCard 
              rank={1}
              courseName="서울 망원"
            recommendations={127} 
              image="/images/store-1st.png"
          />
          <RankCard 
              rank={2}
              courseName="부산 서면"
            recommendations={98} 
              image="/images/store-2nd.png"
          />
          <RankCard 
              rank={3}
              courseName="서울 성수"
            recommendations={87} 
              image="/images/store-3rd.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Rank Card Component
function RankCard({
  rank,
  courseName,
  recommendations,
  image,
}: {
  rank: number;
  courseName: string;
  recommendations: number;
  image: string;
}) {
  return (
    <div className="bg-white rounded-[20px] w-[317px] h-[385px] overflow-hidden relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[23px] px-[90px]">
        <div className="flex flex-col items-center gap-[23px] w-[140px]">
          <div className="flex flex-col items-center gap-[12px]">
            {/* Image */}
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden">
              <img
                src={image}
                alt={courseName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rank and Name */}
            <div className="flex flex-col gap-[2px] items-center text-center">
              <p className="text-[20px] text-[#473327] leading-[140%]" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
                {rank}위
              </p>
              <p className="font-semibold text-[24px] text-[#473327] leading-[140%]">
                {courseName}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex items-center gap-[10px]">
            <img
              src="/images/Tumbsup icon_brown.png"
              alt="Thumbs Up"
              className="size-[40px] object-contain"
            />
            <p className="font-semibold text-[32px] text-[#473327] whitespace-nowrap leading-[140%]">
              {recommendations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}