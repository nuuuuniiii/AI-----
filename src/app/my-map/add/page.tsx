'use client';

import { useState } from 'react';
import Link from 'next/link';

// 이미지 상수들 (Figma에서 가져온 이미지들)
const imgBreadroadMainLogo = "http://localhost:3845/assets/a838ee61ea2dfe4010412a285dfef05058eec7d5.png";
const imgProfile = "http://localhost:3845/assets/acce75ea1badd59ba5f146cddfea8fc1075c39c9.png";
const img = "http://localhost:3845/assets/82e1c3ae3c7c8d90232a432e1022ae7bb98d52fb.svg";
const imgSiPinFill = "http://localhost:3845/assets/7a6114bfad87b12dbcd33dc5b5931079a893a36e.svg";
const img1 = "http://localhost:3845/assets/f60aa8e5dfb6a3e9d4eb42adbd74b7931745dfed.svg";
const img2 = "http://localhost:3845/assets/9a432e408770638a6e3bf02e21d34e48da114c3d.svg";
const img3 = "http://localhost:3845/assets/e27adcea3e680f33214ebb38cd945590ba6e810e.svg";
const img4 = "http://localhost:3845/assets/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";
const img5 = "http://localhost:3845/assets/5789783fae643c6e047e16c00ff331c4c98f60b9.svg";
const img6 = "http://localhost:3845/assets/8014bbe825147d61b8e56e07c88adeee7838cff7.svg";
const img7 = "http://localhost:3845/assets/0d5143ff295d7dc9a64432933e8b06afbca79060.svg";
const img8 = "http://localhost:3845/assets/be7b0ae62c52858011b43d5c0acf24af72210a1a.svg";
const img9 = "http://localhost:3845/assets/476b1d21873811e57c196462ae7c7d545273d37c.svg";
const img10 = "http://localhost:3845/assets/25a5935e4afa605c24171eca388f88bbafcc5139.svg";
const img11 = "http://localhost:3845/assets/b6c10e770b9317051fb29abd2f83bc26e315ab05.svg";
const img12 = "http://localhost:3845/assets/5770549b50f727539afba3123bee769ea208bdef.svg";

// GnbBtn 컴포넌트
function GnbBtn({ children, isActive = false, href }: { 
  children: React.ReactNode, 
  isActive?: boolean,
  href?: string 
}) {
  const content = (
    <div className={`box-border flex gap-[10px] items-center justify-center px-[24px] py-[8px] relative rounded-[8px] ${
      isActive ? 'bg-[rgba(255,255,255,0.15)]' : 'bg-[rgba(255,255,255,0)]'
    }`}>
      <p className={`font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[13px] text-center whitespace-nowrap ${
        isActive ? 'text-white' : 'text-[rgba(255,255,255,0.5)]'
      }`}>
        {children}
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

// MainInput 컴포넌트
function MainInput() {
  return (
    <div className="bg-white flex h-[57px] items-center px-[20px] py-[8px] relative rounded-[30px] w-[850px]">
      <div className="flex items-center justify-between w-full">
        <p className="font-['Pretendard',_sans-serif] font-medium leading-normal text-[18px] text-[#d3ccc6] whitespace-nowrap">
          맛있는 빵을 검색해보세요
        </p>
        <div className="bg-[#473327] flex h-[40px] items-center justify-center rounded-[30px] w-[40px]">
          <div className="relative size-[24px]">
            <img alt="" className="block max-w-none size-full" src={img} />
          </div>
        </div>
      </div>
    </div>
  );
}

// GNB 컴포넌트
function Gnb() {
  return (
    <div className="bg-[#473327] h-[90px] relative w-full">
      <div className="absolute flex gap-[6px] items-center left-[19px] top-1/2 -translate-y-1/2">
        <div className="h-[24px] relative w-[38px]">
          <div className="absolute h-[26px] -left-[1.58px] top-0 w-[41.167px]">
            <div className="absolute h-[26px] left-0 top-0 w-[41.167px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[320.83%] -left-[44.74%] max-w-none -top-[73.46%] w-[202.63%]" src={imgBreadroadMainLogo} />
              </div>
            </div>
          </div>
          <div className="absolute left-px size-[8px] top-[2px]">
            <img alt="" className="block max-w-none size-full" src={imgSiPinFill} />
          </div>
        </div>
        <p className="font-['Bagel_Fat_One',_sans-serif] leading-[1.4] relative text-[24px] text-white whitespace-nowrap">
          빵지순례
        </p>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <MainInput />
      </div>
      <div className="absolute flex gap-[8px] items-center right-[20px] top-1/2 -translate-y-1/2">
        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] opacity-70 relative text-[15px] text-white whitespace-nowrap">
          Hyegyo Lee
        </p>
        <div className="relative size-[28px]">
          <img alt="" className="block max-w-none size-full" height="28" src={imgProfile} width="28" />
        </div>
      </div>
    </div>
  );
}

// BakeryCard 컴포넌트
function BakeryCard({ 
  index, 
  onMoveUp, 
  onMoveDown, 
  onDelete, 
  canMoveUp, 
  canMoveDown 
}: { 
  index: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  return (
    <div className="relative w-[768px]">
      {/* Up Arrow */}
      {canMoveUp && (
        <div className="absolute flex items-center justify-center left-[367px] size-[34px] top-0 cursor-pointer" onClick={onMoveUp}>
          <div className="flex-none rotate-[180deg]">
            <div className="relative size-[34px]">
              <img alt="" className="block max-w-none size-full" src={img11} />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Card */}
      <div className={`bg-[#9a8779] border border-[#ba9b7c] border-solid h-[273px] relative rounded-[20px] w-[768px] ${canMoveUp ? 'mt-[34px]' : ''}`}>
        <div className="h-[273px] overflow-hidden relative rounded-[inherit] w-[768px]">
          <div className="absolute flex flex-col gap-[22px] items-start left-[40px] top-[24px] w-[688px]">
            {/* Search Field */}
            <div className="bg-white flex flex-col gap-[10px] h-[50px] items-start justify-center px-[20px] py-[16px] relative rounded-[100px] w-[231px]">
              <div className="flex items-start justify-between relative w-full">
                <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[18px] text-[#846d5c] whitespace-nowrap">
                  빵집 검색하기
                </p>
                <div className="bg-[#473327] flex gap-[5.659px] h-[20.012px] items-center justify-center px-[14.146px] py-[6.366px] relative rounded-[30px] w-[20.512px]">
                  <div className="relative size-[16.976px]">
                    <img alt="" className="block max-w-none size-full" src={img3} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="flex gap-[15px] items-start relative w-full">
              {/* Image */}
              <div className="h-[131px] relative rounded-[10px] w-[138px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={img4} />
              </div>
              
              {/* Form Fields */}
              <div className="flex gap-[67px] items-center relative">
                <div className="flex flex-col gap-[7px] items-start relative w-[174px]">
                  {/* Operating Hours */}
                  <div className="h-[59px] relative w-full">
                    <div className="flex flex-col gap-[2px] items-start relative w-[174px]">
                      <div className="flex gap-[2px] items-center relative w-full">
                        <div className="relative size-[20px]">
                          <div className="absolute inset-[12.5%]">
                            <div className="absolute bottom-[-31.67%] left-[-15.83%] right-[-15.83%] top-0">
                              <img alt="" className="block max-w-none size-full" src={img5} />
                            </div>
                          </div>
                        </div>
                        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[14px] text-white w-[150px]">
                          영업일
                        </p>
                      </div>
                      <div className="bg-white h-[37px] overflow-hidden relative rounded-[10px] w-[163px]">
                        <p className="absolute font-['Pretendard',_sans-serif] font-semibold leading-[1.4] left-[72px] text-[10px] text-[#846d5c] text-right top-[12px] -translate-x-full whitespace-nowrap">
                          영업일 입력하기
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="h-[59px] relative w-full">
                    <div className="h-[59px] relative w-[174px]">
                      <div className="flex flex-col gap-[2px] items-start relative w-[174px]">
                        <div className="flex gap-[2px] h-[20px] items-center relative w-full">
                          <div className="relative size-[20px]">
                            <div className="absolute inset-[14.9%_14.33%_16.96%_14.33%]">
                              <div className="absolute bottom-[-58.7%] left-[-28.03%] right-[-28.03%] top-0">
                                <img alt="" className="block max-w-none size-full" src={img6} />
                              </div>
                            </div>
                          </div>
                          <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[14px] text-white w-[150px]">
                            별점
                          </p>
                        </div>
                        <div className="bg-white h-[37px] overflow-hidden relative rounded-[10px] w-[163px]">
                          <p className="absolute font-['Pretendard',_sans-serif] font-semibold leading-[1.4] left-[64px] text-[10px] text-[#846d5c] text-right top-[12px] -translate-x-full whitespace-nowrap">
                            별점 등록하기
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Review */}
                <div className="h-[125px] relative w-[294px]">
                  <div className="h-[59px] relative w-[174px]">
                    <div className="flex flex-col gap-[2px] items-start left-[2px] relative w-[292px]">
                      <div className="flex gap-[2px] h-[20px] items-center relative w-[174px]">
                        <div className="relative size-[20px]">
                          <div className="absolute aspect-[26.2118/26.4643] left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2">
                            <div className="absolute bottom-[-52.82%] left-[-26.67%] right-[-26.67%] top-0">
                              <img alt="" className="block max-w-none size-full" src={img7} />
                            </div>
                          </div>
                          <div className="absolute inset-0">
                            <img alt="" className="block max-w-none size-full" src={img8} />
                          </div>
                        </div>
                        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[14px] text-white w-[150px]">
                          리뷰
                        </p>
                      </div>
                      <div className="bg-white h-[103px] overflow-hidden relative rounded-[10px] w-full">
                        <p className="absolute font-['Pretendard',_sans-serif] font-semibold leading-[1.4] left-[9px] text-[10px] text-[#846d5c] top-[12px] whitespace-nowrap">
                          리뷰 입력하기
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Down Arrow */}
      {canMoveDown && (
        <div className="absolute left-[367px] size-[34px] top-[273px] cursor-pointer" onClick={onMoveDown}>
          <img alt="" className="block max-w-none size-full" src={img9} />
        </div>
      )}
      
      {/* Delete Button */}
      <div className="absolute left-[712px] size-[16px] top-[24px] cursor-pointer" onClick={onDelete}>
        <img alt="" className="block max-w-none size-full" src={img10} />
      </div>
    </div>
  );
}

export default function MyMapAdd() {
  const [bakeryCards, setBakeryCards] = useState([1, 2, 3]); // 초기 3개 카드

  const addBakeryCard = () => {
    setBakeryCards([...bakeryCards, bakeryCards.length + 1]);
  };

  const deleteBakeryCard = (index: number) => {
    setBakeryCards(bakeryCards.filter((_, i) => i !== index));
  };

  const moveCardUp = (index: number) => {
    if (index > 0) {
      const newCards = [...bakeryCards];
      const temp = newCards[index];
      newCards[index] = newCards[index - 1];
      newCards[index - 1] = temp;
      setBakeryCards(newCards);
    }
  };

  const moveCardDown = (index: number) => {
    if (index < bakeryCards.length - 1) {
      const newCards = [...bakeryCards];
      const temp = newCards[index];
      newCards[index] = newCards[index + 1];
      newCards[index + 1] = temp;
      setBakeryCards(newCards);
    }
  };

  return (
    <div className="bg-white flex flex-col items-start pb-[84px] pt-0 px-0 relative w-full min-h-screen">
      <Gnb />
      
      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
          <GnbBtn href="/">Home</GnbBtn>
          <GnbBtn href="/explore">Others</GnbBtn>
          <GnbBtn href="/my-map" isActive>My Map</GnbBtn>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-[70px] items-start pb-0 pt-[23px] px-0 relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-0 relative w-full">
          <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
            <h1 className="font-['Bagel_Fat_One',_sans-serif] relative text-[50px] text-[#50392b] uppercase w-full">
              빵지순례코스 추가하기
            </h1>
            <p className="font-['Pretendard',_sans-serif] font-semibold relative text-[18px] text-[#dabea6] w-full">
              나만이 아는 빵지순례코스를 만들고 공유해보세요!
            </p>
          </div>
        </div>

        {/* Registration Field */}
        <div className="flex gap-[130px] items-start pl-[70px] pr-[191.67px] py-0 relative w-full">
          {/* Course Info */}
          <div className="flex flex-col gap-[30px] items-start relative w-[356px]">
            <div className="bg-[#9a8779] h-[234px] overflow-hidden relative rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] w-full">
              <div className="absolute h-[75px] left-[26px] top-[125px] w-[304px]">
                <div className="flex flex-col gap-[2px] items-start relative w-[174px]">
                  <div className="flex flex-col gap-[2px] items-start relative w-full">
                    <div className="flex flex-col gap-[6px] items-start relative w-[304px]">
                      <div className="flex gap-[2px] items-center relative w-full">
                        <div className="relative size-[25px]">
                          <div className="absolute inset-[12.5%]">
                            <div className="absolute bottom-[-31.67%] left-[-15.83%] right-[-15.83%] top-0">
                              <img alt="" className="block max-w-none size-full" src={img1} />
                            </div>
                          </div>
                        </div>
                        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[18px] text-white w-[150px]">
                          날짜
                        </p>
                      </div>
                      <div className="bg-white h-[44px] overflow-hidden relative rounded-[10px] w-[304px]">
                        <p className="absolute font-['Pretendard',_sans-serif] font-semibold leading-[1.4] left-[9px] text-[14px] text-[#846d5c] top-[12px] whitespace-nowrap">
                          다녀온 날짜를 입력하세요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute h-[71px] left-[26px] top-[28px] w-[304px]">
                <div className="flex flex-col gap-[2px] items-start relative w-[174px]">
                  <div className="flex flex-col gap-[2px] items-start relative w-full">
                    <div className="flex flex-col gap-[6px] items-start relative w-[304px]">
                      <div className="flex gap-[2px] items-center relative w-full">
                        <div className="relative size-[25px]">
                          <img alt="" className="block max-w-none size-full" src={img2} />
                        </div>
                        <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[18px] text-white w-[150px]">
                          순례코스 이름
                        </p>
                      </div>
                      <div className="bg-white h-[44px] overflow-hidden relative rounded-[10px] w-[304px]">
                        <p className="absolute font-['Pretendard',_sans-serif] font-semibold leading-[1.4] left-[9px] text-[14px] text-[#846d5c] top-[12px] whitespace-nowrap">
                          코스의 이름을 입력해주세요
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#644c39] border border-[#644c39] border-solid flex items-center justify-center py-[12px] relative rounded-[10px] w-full">
              <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-[#edebe9] uppercase whitespace-nowrap">
                등록하기
              </p>
            </div>
          </div>

          {/* Bakery Cards */}
          <div className="h-[1036px] relative w-[768px]">
            <div className="flex flex-col gap-[34px] items-start relative">
              {bakeryCards.map((card, index) => (
                <BakeryCard
                  key={card}
                  index={index}
                  onMoveUp={() => moveCardUp(index)}
                  onMoveDown={() => moveCardDown(index)}
                  onDelete={() => deleteBakeryCard(index)}
                  canMoveUp={index > 0}
                  canMoveDown={index < bakeryCards.length - 1}
                />
              ))}
              
              {/* Add Card Button */}
              <div className="flex items-center justify-center left-[367px] size-[34px] relative cursor-pointer" onClick={addBakeryCard}>
                <div className="flex-none">
                  <div className="relative size-[34px]">
                    <div className="absolute inset-[8.333%]">
                      <img alt="" className="block max-w-none size-full" src={img12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

