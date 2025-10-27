'use client';

interface BakeryCardProps {
  card: string;
  index: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export default function BakeryCard({ 
  card,
  index, 
  onMoveUp, 
  onMoveDown, 
  onDelete, 
  canMoveUp, 
  canMoveDown 
}: BakeryCardProps) {
  return (
    <div className="flex items-center justify-between py-[20px] relative w-full">
      <div className="flex items-center gap-[16px]">
        <div className="size-[44px] relative">
          <img 
            src={card} 
            alt={`Bakery ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-['Pretendard',_sans-serif] font-normal text-[18px] text-[#473327]">
            빵집 {index + 1}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-[8px]">
        {canMoveUp && (
          <button 
            onClick={onMoveUp}
            className="bg-[#9a8779] text-white px-[8px] py-[4px] rounded text-[12px] hover:bg-[#7a6f5f]"
          >
            ↑
          </button>
        )}
        {canMoveDown && (
          <button 
            onClick={onMoveDown}
            className="bg-[#9a8779] text-white px-[8px] py-[4px] rounded text-[12px] hover:bg-[#7a6f5f]"
          >
            ↓
          </button>
        )}
        <button 
          onClick={onDelete}
          className="bg-red-500 text-white px-[8px] py-[4px] rounded text-[12px] hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
