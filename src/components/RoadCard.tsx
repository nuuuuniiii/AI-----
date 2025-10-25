'use client';

interface RoadCardProps {
  name: string;
  hours: string;
  rating: number;
  review: string;
  image: string;
}

export default function RoadCard({ name, hours, rating, review, image }: RoadCardProps) {
  return (
    <div className="bg-white flex items-center justify-between p-[20px] rounded-[20px] w-[524px]">
      <div className="flex flex-col gap-[7px] items-start w-[251px]">
        <div className="flex gap-[10px] items-center">
          <img src="/images/Not icon.png" alt="Bread" className="size-[32px] object-contain" />
          <p className="font-bold text-[20px] text-[#473327] uppercase tracking-[-0.5px] whitespace-pre">
            {name}
          </p>
        </div>
        <div className="flex gap-[10px] items-center w-full">
          <img src="/images/Clock icon.png" alt="Clock" className="size-[32px] object-contain" />
          <p className="text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-pre">
            {hours}
          </p>
        </div>
        <div className="flex gap-[10px] items-center">
          <img src="/images/Star icon.png" alt="Star" className="size-[32px] object-contain" />
          <p className="text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-pre">
            {rating}
          </p>
        </div>
        <div className="flex gap-[10px] items-center">
          <img src="/images/Not icon.png" alt="Review" className="size-[32px] object-contain" />
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
