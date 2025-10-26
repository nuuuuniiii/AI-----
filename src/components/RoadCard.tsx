'use client';

import { BreadIconBrown, ClockIconBrown, StarIconBrown, EditIcon } from './Icons';

interface RoadCardProps {
  name: string;
  hours: string;
  rating: number;
  review: string;
  image: string;
  order: number;
}

export default function RoadCard({ name, hours, rating, review, image, order }: RoadCardProps) {
  return (
    <div className="bg-white flex items-center justify-between p-[20px] rounded-[20px] w-[524px]">
      <div className="flex flex-col gap-[7px] items-start w-[251px]">
        <div className="flex gap-[10px] items-center">
          <BreadIconBrown number={order} />
          <p className="font-bold text-[20px] text-[#473327] uppercase tracking-[-0.5px] whitespace-pre">
            {name}
          </p>
        </div>
        <div className="flex gap-[10px] items-center w-full">
          <ClockIconBrown />
          <p className="text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-pre">
            {hours}
          </p>
        </div>
        <div className="flex gap-[10px] items-center">
          <StarIconBrown />
          <p className="text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-pre">
            {rating}
          </p>
        </div>
        <div className="flex gap-[10px] items-center">
          <EditIcon />
          <p className="text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-pre">
            {review}
          </p>
        </div>
      </div>
      <div className="size-[153px] relative rounded-[4px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
