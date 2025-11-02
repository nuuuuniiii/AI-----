'use client';

import Link from 'next/link';
import type { UserRanking } from '@/types/data';
import { BreadIconBrownExplore } from './Icons';

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
