'use client';

import Link from 'next/link';
import { UserRanking } from '@/data/user-ranking';
import { BreadIconBrownExplore } from './Icons';

// Figma에서 가져온 이미지 상수
const imgVector200 = "http://localhost:3845/assets/3c11924e91a91a449cd80c92333b3270d5e92e99.svg";

interface RankingRowProps {
  user: UserRanking;
}

export default function RankingRow({ user }: RankingRowProps) {
  return (
    <Link href={`/user-map/${user.id}`} className="block">
      <div className="flex gap-[16px] items-center justify-center px-0 py-[20px] relative">
        {/* Bread Icon */}
        <BreadIconBrownExplore number={user.rank} />
        
        {/* User Name */}
        <div className="flex flex-col items-start relative flex-1">
          <p className="font-['Pretendard',_sans-serif] font-normal leading-[28px] text-[20px] text-[#473327] w-full">
            {user.nickname}
          </p>
        </div>
        
        {/* Review Count */}
        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] text-[18px] text-[#473327] text-right whitespace-nowrap">
          순례지 {user.reviewCount}개
        </p>
        
        {/* Bottom Border */}
        <div className="absolute bottom-0 h-0 left-0 right-[-0.33px]">
          <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
            <img alt="" className="block max-w-none size-full" src={imgVector200} />
          </div>
        </div>
      </div>
    </Link>
  );
}
