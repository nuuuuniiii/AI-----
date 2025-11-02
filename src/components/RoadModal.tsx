'use client';

import { useState, useEffect } from 'react';
import RoadCard from './RoadCard';
import { ThumbsUpIconWhite } from './Icons';

interface RoadModalProps {
  location: string;
  recommendations: number;
  shops: Array<{
    name: string;
    hours: string;
    rating: number;
    review: string;
    image: string;
  }>;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  courseId?: string;
  onRecommend?: (newCount: number) => void;
}

export default function RoadModal({ location, recommendations: initialRecommendations, shops, onEdit, onDelete, showActions = true, courseId, onRecommend }: RoadModalProps) {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [isRecommended, setIsRecommended] = useState(false);

  // 컴포넌트 마운트 시 이미 추천했는지 확인
  useEffect(() => {
    const checkRecommendation = async () => {
      if (!courseId) return;
      
      try {
        const { auth, db } = await import('@/lib/supabase-client');
        const { user } = await auth.getCurrentUser();
        
        if (!user) return;

        const { data: existingRecommendations } = await db.select('recommendations', '*', {
          course_id: courseId,
          user_id: user.id
        });

        if (existingRecommendations && Array.isArray(existingRecommendations) && existingRecommendations.length > 0) {
          setIsRecommended(true);
        }
      } catch (error) {
        console.error('추천 상태 확인 중 오류:', error);
      }
    };

    checkRecommendation();
  }, [courseId]);

  const handleThumbsUp = async () => {
    if (!courseId || isRecommended) return;
    
    try {
      const { auth, db } = await import('@/lib/supabase-client');
      const { user } = await auth.getCurrentUser();
      
      if (!user) {
        alert('로그인이 필요합니다.');
        return;
      }

      // 이미 추천했는지 확인
      const { data: existingRecommendations } = await db.select('recommendations', '*', {
        course_id: courseId,
        user_id: user.id
      });

      if (existingRecommendations && Array.isArray(existingRecommendations) && existingRecommendations.length > 0) {
        alert('이미 추천한 코스입니다.');
        return;
      }

      // 추천 추가
      const { error: recommendError } = await db.insert('recommendations', {
        course_id: courseId,
        user_id: user.id,
        created_at: new Date().toISOString()
      });

      if (recommendError) {
        console.error('추천 추가 실패:', recommendError);
        alert('추천 추가에 실패했습니다.');
        return;
      }

      // bread_courses의 recommendation_count 업데이트
      const { data: courseData } = await db.select('bread_courses', '*', { id: courseId });
      if (courseData && courseData.length > 0) {
        const currentCount = (courseData[0] as { recommendation_count?: number }).recommendation_count || 0;
        const { error: updateError } = await db.update('bread_courses', {
          recommendation_count: currentCount + 1
        }, { id: courseId });

        if (updateError) {
          console.error('추천 수 업데이트 실패:', updateError);
        }
      }

      // 로컬 상태 업데이트
      const newCount = recommendations + 1;
      setRecommendations(newCount);
      setIsRecommended(true);
      
      // 부모 컴포넌트에 알림
      if (onRecommend) {
        onRecommend(newCount);
      }
    } catch (error) {
      console.error('추천 처리 중 오류:', error);
      alert('추천 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-[#9a8779] flex flex-col gap-[20px] items-start px-[33px] py-[30px] rounded-[20px] w-[590px]">
      <div className="flex items-center justify-between w-full">
        <p className="font-normal text-[40px] text-white whitespace-pre" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
          {location}
        </p>
        <div 
          className={`flex gap-[10px] items-center ${courseId && !isRecommended ? 'cursor-pointer hover:opacity-80' : ''} ${isRecommended ? 'opacity-70' : ''}`}
          onClick={courseId && !isRecommended ? handleThumbsUp : undefined}
        >
          <ThumbsUpIconWhite />
          <p className="font-semibold text-[32px] text-white whitespace-pre">
            {recommendations}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] items-start w-full">
        <div className="flex flex-col gap-[30px] items-start w-full">
          {shops.map((shop, index) => (
            <RoadCard key={index} {...shop} order={index + 1} />
          ))}
        </div>
        {showActions && onEdit && onDelete && (
          <div className="flex gap-[16px] items-center w-full">
            <button
              onClick={onDelete}
              className="flex-1 bg-[#473327] border border-[#473327] border-solid flex items-center justify-center px-0 py-[12px] rounded-[10px] hover:bg-[#3a2a1f] transition-colors"
            >
              <p className="font-bold text-[20px] text-white uppercase whitespace-pre leading-[140%]">
                삭제하기
              </p>
            </button>
            <button
              onClick={onEdit}
              className="flex-1 bg-white border border-[#473327] border-solid flex items-center justify-center px-0 py-[12px] rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              <p className="font-bold text-[20px] text-[#473327] uppercase whitespace-pre leading-[140%]">
                수정하기
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
