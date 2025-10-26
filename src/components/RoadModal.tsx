'use client';

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
  onEdit: () => void;
  onDelete: () => void;
}

export default function RoadModal({ location, recommendations, shops, onEdit, onDelete }: RoadModalProps) {
  return (
    <div className="bg-[#9a8779] flex flex-col gap-[20px] items-start px-[33px] py-[30px] rounded-[20px] w-[590px]">
      <div className="flex items-center justify-between w-full">
        <p className="font-normal text-[40px] text-white whitespace-pre" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
          {location}
        </p>
        <div className="flex gap-[10px] items-center">
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
      </div>
    </div>
  );
}
