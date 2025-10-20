"use client"

import Image from 'next/image'
import Link from 'next/link'

// 이미지 상수들 (Figma에서 가져온 이미지들)
const imgBreadroadMainLogo = "http://localhost:3845/assets/a838ee61ea2dfe4010412a285dfef05058eec7d5.png"
const imgProfile = "http://localhost:3845/assets/acce75ea1badd59ba5f146cddfea8fc1075c39c9.png"
const img = "http://localhost:3845/assets/82e1c3ae3c7c8d90232a432e1022ae7bb98d52fb.svg"
const imgSiPinFill = "http://localhost:3845/assets/7a6114bfad87b12dbcd33dc5b5931079a893a36e.svg"
const img1 = "http://localhost:3845/assets/bfc6754a4d3e74494b71389136f5a4f34ab8bdb3.svg"
const img2 = "http://localhost:3845/assets/9c36a504956dd6c803ed62d9e58e4c9d2f47d40b.svg"
const imgTumbsupIcon = "http://localhost:3845/assets/840d6f9ca2d0a6e8188c301f3049ca3b6484e53b.svg"
const imgClockIcon = "http://localhost:3845/assets/6a376739609fbcbe5f1c2907ada436c16975d640.svg"
const imgStarIcon = "http://localhost:3845/assets/6fd512f9550b1caedae5489641d8f5d0b5c93c32.svg"
const imgNotIcon = "http://localhost:3845/assets/b33e7e8bc4ab00ca46c0f4a0940db7cbda18d61a.svg"
const imgNotIcon2 = "http://localhost:3845/assets/a86fcf13e65f0fe1d193af8e9524bfe95d4b157e.svg"
const imgBreadIcon = "http://localhost:3845/assets/6833295eeb769841188ea117a4938e0e9156c9b9.svg"

// 요청하신 이미지들 (Figma에서 가져온 이미지들)
const imgMandong = "http://localhost:3845/assets/f9fdc64e9089376a6f16c708c1d255f24341a0e1.png"
const imgLeeBread = "http://localhost:3845/assets/de53cccc8e54593c26fee7441c477ae8a82cd7a4.png"
const imgJungdong = "http://localhost:3845/assets/1151339c92f2e5bc1eacc5a0f66b7e3b52abe21b.png"

// BreadIcon 컴포넌트 (지도 페이지에서 가져옴)
function BreadIcon({ 
  name, 
  isCity, 
  left, 
  top, 
  onClick 
}: { 
  name: string
  isCity: boolean
  left: number
  top: number
  onClick: () => void
}) {
  return (
    <div 
      className="absolute cursor-pointer flex flex-col items-center justify-center" 
      style={{ left: `${left}px`, top: `${top}px` }}
      onClick={onClick}
    >
      {/* 텍스트 - 아이콘 위에 배치 */}
      <p 
        className={`font-['Pretendard',_sans-serif] font-semibold leading-[1.4] text-[20px] text-center uppercase whitespace-nowrap mb-[8px] ${
          isCity ? 'text-white' : 'text-[#473327]'
        }`}
      >
        {name}
      </p>
      
      {/* 빵 아이콘 */}
      <div className="h-[48.125px] relative w-[55px]">
        <div className="absolute bottom-[-16.62%] left-[-7.27%] right-[-7.27%] top-0">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src={isCity ? "http://localhost:3845/assets/c7615a9311925ac9a91ee9772a2a08f169cfd93a.svg" : "http://localhost:3845/assets/d054f4272c3c07e5e7d9a8a8d9c2d644e3729dc8.svg"} 
          />
        </div>
      </div>
    </div>
  )
}

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
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
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
  )
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
  )
}

// RoadCard 컴포넌트
function RoadCard({ 
  rank, 
  storeName, 
  time, 
  rating, 
  review, 
  storeImage 
}: { 
  rank: string
  storeName: string
  time: string
  rating: string
  review: string
  storeImage: string
}) {
  return (
    <div className="bg-white flex items-center justify-between p-[20px] relative rounded-[20px] w-full">
      <div className="flex flex-col gap-[7px] items-start relative w-[251px]">
        <div className="flex gap-[10px] items-center relative">
          <div className="flex flex-col gap-[7.273px] items-center justify-center relative size-[32px]">
            <div className="h-[24px] relative w-[26px]">
              <div className="absolute bottom-[-24.24%] left-[-11.19%] right-[-11.19%] top-0">
                <img alt="" className="block max-w-none size-full" src={imgBreadIcon} />
              </div>
            </div>
            <p className="absolute font-['Pretendard',_sans-serif] font-semibold leading-[1.4] text-[16px] text-center text-white uppercase">
              {rank}
            </p>
          </div>
          <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-[#473327] tracking-[-0.5px] uppercase whitespace-nowrap">
            {storeName}
          </p>
        </div>
        <div className="flex gap-[10px] items-center relative w-full">
          <div className="relative size-[32px]">
            <div className="absolute inset-[12.5%]">
              <img alt="" className="block max-w-none size-full" src={imgClockIcon} />
            </div>
          </div>
          <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] leading-[1.4] relative text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-nowrap">
            {time}
          </p>
        </div>
        <div className="flex gap-[10px] items-center relative">
          <div className="relative size-[32px]">
            <div className="absolute inset-[14.9%_14.33%_16.96%_14.33%]">
              <img alt="" className="block max-w-none size-full" src={imgStarIcon} />
            </div>
          </div>
          <p className="font-['Helvetica_Neue',_sans-serif] leading-[1.4] relative text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-nowrap">
            {rating}
          </p>
        </div>
        <div className="flex gap-[10px] items-center relative">
          <div className="relative size-[32px]">
            <div className="absolute aspect-[26.2118/26.4643] left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2">
              <img alt="" className="block max-w-none size-full" src={imgNotIcon} />
            </div>
            <div className="absolute inset-0">
              <img alt="" className="block max-w-none size-full" src={imgNotIcon2} />
            </div>
          </div>
          <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] leading-[1.4] relative text-[14px] text-[#473327] tracking-[-0.35px] uppercase whitespace-nowrap">
            {review}
          </p>
        </div>
      </div>
      <div className="relative size-[153px]">
        <div className="absolute left-0 size-[153px] top-0">
          <div className="absolute right-0 rounded-[4px] size-[153px] top-0">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
              <img alt={storeName} className="absolute left-[-10.37%] max-w-none size-[121.93%] top-[-14.07%]" src={storeImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GangneungRegion() {
  return (
    <div className="bg-white flex flex-col items-start relative w-full min-h-screen">
      <Gnb />
      
      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
          <GnbBtn href="/">Home</GnbBtn>
          <GnbBtn href="/explore">Others</GnbBtn>
          <GnbBtn href="/my-map" isActive>My Map</GnbBtn>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex flex-col items-start pb-0 pt-[23px] px-0 relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-0 relative w-full">
          <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
            <h1 className="font-['Bagel_Fat_One',_sans-serif] relative text-[50px] text-[#50392b] uppercase w-full">
              내 빵지순례 지도
            </h1>
            <p className="font-['Pretendard',_sans-serif] font-semibold relative text-[18px] text-[#dabea6] w-full">
              내가 등록한 빵지순례코스를 한눈에 볼 수 있어요
            </p>
          </div>
          <div className="flex gap-[15px] items-center relative">
            <div className="bg-[#473327] border border-[#473327] border-solid flex items-center justify-between pl-[20px] pr-[4px] py-[12px] relative rounded-[100px] w-[180px]">
              <p className="font-['Helvetica_Neue',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-white uppercase whitespace-nowrap">
                추가하기
              </p>
              <div className="flex h-[32px] items-center justify-center relative w-[32px]">
                <div className="flex-none rotate-[270deg]">
                  <div className="relative size-[32px]">
                    <img alt="" className="block max-w-none size-full" src={img1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Modal */}
        <div className="flex items-center pb-[75px] pl-[97px] pt-[69px] relative w-full">
          {/* Map - 전 페이지에서 그대로 가져옴 */}
          <div className="flex gap-[10px] items-center relative">
            <div className="flex gap-[11px] h-[1054px] items-start relative">
              <div className="h-[1042.08px] relative w-[545.725px]">
                <div className="absolute bottom-[-1.69%] left-[-1.61%] right-[-1.22%] top-0">
                  <img alt="" className="block max-w-none size-full" src="http://localhost:3845/assets/812113e9717b0e64f7b88adf6589b7d71851003e.svg" />
                </div>
              </div>
              <div className="h-[584px] relative w-[114.941px]">
                <div className="absolute bottom-0 left-[-7.29%] right-[-6.64%] top-0">
                  <img alt="" className="block max-w-none size-full" src="http://localhost:3845/assets/40cea3564b75897c8fd06edf062427a42750f3f0.svg" />
                </div>
              </div>
            </div>
            
            {/* Bread Icons - 지도 페이지에서 그대로 가져옴 */}
            <div className="absolute h-[1054px] left-0 top-0 w-[672px]">
              <BreadIcon 
                name="포천" 
                isCity={true} 
                left={93} 
                top={123} 
                onClick={() => console.log("포천 클릭")} 
              />
              <BreadIcon 
                name="춘천" 
                isCity={true} 
                left={148} 
                top={140} 
                onClick={() => console.log("춘천 클릭")} 
              />
              <BreadIcon 
                name="강릉" 
                isCity={true} 
                left={326} 
                top={174} 
                onClick={() => console.log("강릉 클릭")} 
              />
              <BreadIcon 
                name="망원" 
                isCity={false} 
                left={7} 
                top={203} 
                onClick={() => console.log("망원 클릭")} 
              />
              <BreadIcon 
                name="성수" 
                isCity={false} 
                left={62} 
                top={227} 
                onClick={() => console.log("성수 클릭")} 
              />
              <BreadIcon 
                name="서면" 
                isCity={false} 
                left={336} 
                top={659} 
                onClick={() => console.log("서면 클릭")} 
              />
              <BreadIcon 
                name="서귀포" 
                isCity={false} 
                left={52} 
                top={1000} 
                onClick={() => console.log("서귀포 클릭")} 
              />
              <BreadIcon 
                name="전포" 
                isCity={false} 
                left={376} 
                top={671} 
                onClick={() => console.log("전포 클릭")} 
              />
              <BreadIcon 
                name="대전" 
                isCity={true} 
                left={141} 
                top={477} 
                onClick={() => console.log("대전 클릭")} 
              />
              <BreadIcon 
                name="여수" 
                isCity={true} 
                left={131} 
                top={783} 
                onClick={() => console.log("여수 클릭")} 
              />
            </div>
          </div>

          {/* Road Modal - 오른쪽 끝에서 70px 떨어진 위치 */}
          <div className="bg-[#9a8779] flex flex-col gap-[20px] items-start px-[33px] py-[30px] absolute right-[70px] top-[69px] rounded-[20px] w-[590px]">
            <div className="flex items-center justify-between relative w-full">
              <h2 className="font-['Bagel_Fat_One',_sans-serif] leading-[1.4] relative text-[40px] text-white whitespace-nowrap">
                강릉
              </h2>
              <div className="flex gap-[10px] items-center relative">
                <div className="relative size-[40px]">
                  <img alt="" className="block max-w-none size-full" src={imgTumbsupIcon} />
                </div>
                <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[32px] text-white whitespace-nowrap">
                  127
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-[20px] items-start relative w-full">
              <div className="flex flex-col gap-[30px] items-start relative w-full">
                <RoadCard 
                  rank="1"
                  storeName="만동제과"
                  time="오전 8시~오후4시 / 매주 월요일 휴무"
                  rating="3.8"
                  review="무화과 베이글이 맛있는 집"
                  storeImage={imgMandong}
                />
                <RoadCard 
                  rank="2"
                  storeName="이씨네 빵집"
                  time="오전 8시~오후8시"
                  rating="3.8"
                  review="쫀득쿠키 맛집"
                  storeImage={imgLeeBread}
                />
                <RoadCard 
                  rank="3"
                  storeName="정동문화사"
                  time="오전 8시~오후6시 / 매주 일요일 휴무"
                  rating="3.8"
                  review="무화과 크림치즈 휘낭시에가 맛있는 집"
                  storeImage={imgJungdong}
                />
              </div>
              
              <div className="flex gap-[16px] h-[52px] items-center relative w-full">
                <div className="basis-0 bg-[#473327] border border-[#473327] border-solid flex grow items-center justify-center min-h-px min-w-px py-[12px] relative rounded-[10px]">
                  <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-white uppercase whitespace-nowrap">
                    삭제하기
                  </p>
                </div>
                <div className="basis-0 bg-white border border-[#473327] border-solid flex grow items-center justify-center min-h-px min-w-px py-[12px] relative rounded-[10px]">
                  <p className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-[#473327] text-center uppercase whitespace-nowrap">
                    수정하기
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
