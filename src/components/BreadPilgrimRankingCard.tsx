'use client';

import { BreadPilgrimRanking } from '@/data/ranking';
import Image from 'next/image';
import Link from 'next/link';

interface BreadPilgrimRankingCardProps {
  user: BreadPilgrimRanking;
}

export default function BreadPilgrimRankingCard({ user }: BreadPilgrimRankingCardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-gray-200 to-gray-400';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '👑';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏆';
    }
  };

  return (
    <Link href={`/user-map/${user.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-hover:border-[#8B4513]">
        {/* Rank Badge */}
        <div className={`bg-gradient-to-r ${getRankColor(user.rank)} text-white text-center py-2 relative`}>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{getRankIcon(user.rank)}</span>
            <span className="font-bagel-fat-one text-lg">{user.rank}위</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <Image
              src={user.profileImage}
              alt={user.nickname}
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-pretendard-semibold text-[#333333] mb-1">{user.nickname}</h3>
          <p className="text-sm text-[#8B4513] font-pretendard-medium mb-2">{user.level}</p>
          <p className="text-sm text-[#666666] font-pretendard-medium mb-4">📍 {user.region}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-[#F0E6D2] rounded-lg p-3">
              <div className="text-2xl font-pretendard-semibold text-[#8B4513]">{user.reviewCount}</div>
              <div className="text-xs text-[#666666] font-pretendard-medium">리뷰</div>
            </div>
            <div className="bg-[#F0E6D2] rounded-lg p-3">
              <div className="text-2xl font-pretendard-semibold text-[#8B4513]">{user.totalCourses}</div>
              <div className="text-xs text-[#666666] font-pretendard-medium">코스</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-4 bg-[#F9F9F9] rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm font-pretendard-medium text-[#666666]">
                {user.totalRecommendations}개 추천
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
