'use client';

interface RankCardProps {
  rank: number;
  courseName: string;
  recommendations: number;
  image: string;
}

export default function RankCard({
  rank,
  courseName,
  recommendations,
  image,
}: RankCardProps) {
  return (
    <div className="bg-white rounded-[20px] w-[317px] h-[385px] overflow-hidden relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[23px] px-[90px]">
        <div className="flex flex-col items-center gap-[23px] w-[140px]">
          <div className="flex flex-col items-center gap-[12px]">
            {/* Image */}
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden">
              <img
                src={image}
                alt={courseName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rank and Name */}
            <div className="flex flex-col gap-[2px] items-center text-center">
              <p className="text-[20px] text-[#473327] leading-[140%]" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
                {rank}위
              </p>
              <p className="font-semibold text-[24px] text-[#473327] leading-[140%]">
                {courseName}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex items-center gap-[10px]">
            <img
              src="/images/Tumbsup icon_brown.png"
              alt="Thumbs Up"
              className="size-[40px] object-contain"
            />
            <p className="font-semibold text-[32px] text-[#473327] whitespace-nowrap leading-[140%]">
              {recommendations}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
