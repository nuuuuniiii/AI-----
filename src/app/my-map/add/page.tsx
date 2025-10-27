'use client';

import { useState } from 'react';
import Link from 'next/link';
import GNB from '@/components/GNB';
import BakeryRegistrationCard from '@/components/BakeryRegistrationCard';
import AddTop from '@/components/AddTop';
import AddMiddle from '@/components/AddMiddle';
import AddDown from '@/components/AddDown';
import GnbBtn from '@/components/GnbBtn';

export default function MyMapAdd() {
  const [bakeryCards, setBakeryCards] = useState<string[]>([
    "http://localhost:3845/assets/1.svg",
    "http://localhost:3845/assets/2.svg",
    "http://localhost:3845/assets/3.svg",
  ]);
  const [showAddTop, setShowAddTop] = useState(true);
  const [showAddMiddle, setShowAddMiddle] = useState<boolean[]>(new Array(bakeryCards.length).fill(true));

  const addBakeryCard = () => {
    const newCardIndex = bakeryCards.length + 1;
    setBakeryCards([...bakeryCards, `http://localhost:3845/assets/${newCardIndex}.svg`]);
    setShowAddMiddle([...showAddMiddle, true]);
  };

  const deleteBakeryCard = (index: number) => {
    setBakeryCards(bakeryCards.filter((_, i) => i !== index));
    setShowAddMiddle(showAddMiddle.filter((_, i) => i !== index));
  };

  const closeAddTop = () => {
    setShowAddTop(false);
  };

  const closeAddMiddle = (index: number) => {
    const newShowAddMiddle = [...showAddMiddle];
    newShowAddMiddle[index] = false;
    setShowAddMiddle(newShowAddMiddle);
  };

  const moveAddTopDown = () => {
    if (bakeryCards.length > 0 && showAddMiddle[0]) {
      // Move AddTop to first position in AddMiddle array
      const newCards = [...bakeryCards];
      const newShowAddMiddle = [...showAddMiddle];
      
      // Add AddTop data to the beginning
      newCards.unshift('AddTop');
      newShowAddMiddle.unshift(true);
      
      setBakeryCards(newCards);
      setShowAddMiddle(newShowAddMiddle);
      setShowAddTop(false);
    }
  };

  const moveAddMiddleUp = (index: number) => {
    if (index === 0 && !showAddTop) {
      // Move first AddMiddle to AddTop position
      setShowAddTop(true);
      const newCards = [...bakeryCards];
      const newShowAddMiddle = [...showAddMiddle];
      
      newCards.splice(index, 1);
      newShowAddMiddle.splice(index, 1);
      
      setBakeryCards(newCards);
      setShowAddMiddle(newShowAddMiddle);
    } else if (index > 0) {
      // Move up within AddMiddle array
      const newCards = [...bakeryCards];
      const newShowAddMiddle = [...showAddMiddle];
      
      [newCards[index - 1], newCards[index]] = [newCards[index], newCards[index - 1]];
      [newShowAddMiddle[index - 1], newShowAddMiddle[index]] = [newShowAddMiddle[index], newShowAddMiddle[index - 1]];
      
      setBakeryCards(newCards);
      setShowAddMiddle(newShowAddMiddle);
    }
  };

  const moveAddMiddleDown = (index: number) => {
    if (index < bakeryCards.length - 1) {
      // Move down within AddMiddle array
      const newCards = [...bakeryCards];
      const newShowAddMiddle = [...showAddMiddle];
      
      [newCards[index], newCards[index + 1]] = [newCards[index + 1], newCards[index]];
      [newShowAddMiddle[index], newShowAddMiddle[index + 1]] = [newShowAddMiddle[index + 1], newShowAddMiddle[index]];
      
      setBakeryCards(newCards);
      setShowAddMiddle(newShowAddMiddle);
    }
  };

  return (
    <div className="bg-white flex flex-col items-start pb-0 pt-0 px-0 relative w-full min-h-screen">
      <GNB />
      
      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
          <GnbBtn href="/">Home</GnbBtn>
          <GnbBtn href="/explore">Others</GnbBtn>
          <GnbBtn href="/my-map" isActive>My Map</GnbBtn>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-start pb-0 pt-0 px-0 relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-[23px] relative w-full">
          <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
            <h1 className="font-bagel-fat-one relative text-[50px] text-[#50392b] uppercase w-full whitespace-nowrap">
              빵지순례코스 추가하기
            </h1>
            <p className="font-pretendard-medium relative text-[18px] text-[#dabea6] w-full whitespace-nowrap">
              나만이 아는 빵지순례코스를 만들고 공유해보세요!
            </p>
          </div>
        </div>

        {/* Registration Field */}
        <div className="flex gap-[130px] items-start pl-[70px] pr-[191.67px] py-0 relative w-full">
          {/* Course Info */}
          <div className="flex flex-col gap-[30px] items-start relative w-[364px]">
            <BakeryRegistrationCard />
            <div className="bg-[#644c39] border border-[#644c39] border-solid flex items-center justify-center py-[12px] relative rounded-[10px] w-full">
              <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-[#edebe9] uppercase whitespace-nowrap">
                등록하기
              </p>
            </div>
          </div>

          {/* Bakery Cards Section */}
          <div className="relative w-[768px]">
            {/* Bakery Cards Container */}
            <div className="flex flex-col gap-[34px] items-start relative">
              {/* Add Top Component - First Card */}
              {showAddTop && (
                <div className="w-full">
                  <AddTop 
                    onClose={closeAddTop} 
                    onMoveDown={moveAddTopDown}
                  />
                </div>
              )}

              {/* Add Middle Components - Additional Cards */}
              {bakeryCards.map((card, index) => {
                // Check if this is the first visible card in the entire list
                const isFirstVisibleCard = !showAddTop && showAddMiddle[index] && 
                  showAddMiddle.slice(0, index).every(visible => !visible);
                
                return showAddMiddle[index] && (
                  <div key={card} className="w-full">
                    <AddMiddle 
                      onClose={() => closeAddMiddle(index)} 
                      showUpArrow={!isFirstVisibleCard}
                      onMoveUp={() => moveAddMiddleUp(index)}
                      onMoveDown={() => moveAddMiddleDown(index)}
                    />
                  </div>
                );
              })}
              
              {/* Add Down Component - Add New Card Button */}
              <div className="flex items-center justify-center w-full cursor-pointer" onClick={addBakeryCard}>
                <AddDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}