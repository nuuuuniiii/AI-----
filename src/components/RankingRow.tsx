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
    <Link href={`/user-map/${user.id}`} className="block w-full">
      <div className="flex items-center justify-between py-[20px] relative w-full">
        {/* Left side - Bread Icon and User Name */}
        <div className="flex gap-[16px] items-center">
          <BreadIconBrownExplore number={user.rank} />
          <p className="font-['Pretendard',_sans-serif] font-normal leading-[28px] text-[20px] text-[#473327]">
            {user.nickname}
          </p>
        </div>
        
        {/* Right side - Review Count */}
        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] text-[18px] text-[#473327] whitespace-nowrap">
          순례지 {user.reviewCount}개
        </p>
        
        {/* Divider Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}></div>
      </div>
    </Link>
  );
}
