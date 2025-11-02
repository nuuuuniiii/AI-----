'use client';

import { BreadPilgrimRanking } from '@/data/ranking';
import Link from 'next/link';

interface BreadPilgrimRankingRowProps {
  user: BreadPilgrimRanking;
  index: number;
}

export default function BreadPilgrimRankingRow({ user }: BreadPilgrimRankingRowProps) {
  const getRankColor = () => {
    return 'text-[#8B4513] bg-[#F0E6D2]';
  };

  return (
    <Link href={`/user-map/${user.id}`} className="block group">
      <div className="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-[#F9F9F9] transition-colors duration-200">
        {/* Rank */}
        <div className="flex-shrink-0 w-12 text-center">
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-pretendard-semibold ${getRankColor()}`}>
            {user.rank}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 ml-4 min-w-0">
          <h3 className="text-lg font-pretendard-medium text-[#333333] truncate group-hover:text-[#8B4513] transition-colors">
            {user.nickname}
          </h3>
        </div>

        {/* Review Count */}
        <div className="flex-shrink-0 ml-4 text-right">
          <div className="text-sm font-pretendard-medium text-[#666666]">
            순례지 {user.reviewCount}개
          </div>
        </div>
      </div>
    </Link>
  );
}
