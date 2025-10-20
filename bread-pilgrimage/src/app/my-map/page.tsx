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
const imgFrame2147205214 = "http://localhost:3845/assets/812113e9717b0e64f7b88adf6589b7d71851003e.svg"
const imgFrame2147205213 = "http://localhost:3845/assets/40cea3564b75897c8fd06edf062427a42750f3f0.svg"
const img3 = "http://localhost:3845/assets/c7615a9311925ac9a91ee9772a2a08f169cfd93a.svg"
const img4 = "http://localhost:3845/assets/d054f4272c3c07e5e7d9a8a8d9c2d644e3729dc8.svg"

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

// BreadIcon 컴포넌트
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
            src={isCity ? img3 : img4} 
          />
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

export default function MyMap() {
  const handleBreadIconClick = (name: string, isCity: boolean) => {
    console.log(`Clicked on ${name} (${isCity ? '시' : '동'} 단위)`)
    // TODO: 모달 또는 상세 페이지로 이동
  }

  return (
    <div className="bg-white flex flex-col items-start relative w-full min-h-screen">
      <Gnb />
      
      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
          <GnbBtn href="/">Home</GnbBtn>
          <GnbBtn href="/explore">Others</GnbBtn>
          <GnbBtn isActive>My Map</GnbBtn>
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
            <Link href="/my-map/add" className="bg-[#473327] border border-[#473327] border-solid flex items-center justify-between pl-[20px] pr-[4px] py-[12px] relative rounded-[100px] w-[180px] hover:bg-[#3a2a1f] transition-colors">
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
            </Link>
            <div className="bg-white border border-[#50392b] border-solid flex items-center justify-between pl-[20px] pr-[4px] py-[12px] relative rounded-[100px] w-[180px]">
              <p className="font-['Helvetica_Neue',_sans-serif] font-bold leading-[1.4] relative text-[20px] text-[#473327] uppercase whitespace-nowrap">
                삭제하기
              </p>
              <div className="flex h-[32px] items-center justify-center relative w-[32px]">
                <div className="flex-none rotate-[270deg]">
                  <div className="relative size-[32px]">
                    <img alt="" className="block max-w-none size-full" src={img2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[1198px] relative w-full">
          <div className="absolute flex gap-[11px] h-[1054px] items-start left-[420px] top-[69px]">
            <div className="h-[1042.08px] relative w-[545.725px]">
              <div className="absolute bottom-[-1.69%] left-[-1.61%] right-[-1.22%] top-0">
                <img alt="" className="block max-w-none size-full" src={imgFrame2147205214} />
              </div>
            </div>
            <div className="h-[584px] relative w-[114.941px]">
              <div className="absolute bottom-0 left-[-7.29%] right-[-6.64%] top-0">
                <img alt="" className="block max-w-none size-full" src={imgFrame2147205213} />
              </div>
            </div>
          </div>
          
          {/* Bread Icons */}
          <div className="absolute h-[1054px] left-[420px] top-[69px] w-[672px]">
            <BreadIcon 
              name="포천" 
              isCity={true} 
              left={93} 
              top={123} 
              onClick={() => handleBreadIconClick("포천", true)} 
            />
            <BreadIcon 
              name="춘천" 
              isCity={true} 
              left={148} 
              top={140} 
              onClick={() => handleBreadIconClick("춘천", true)} 
            />
            <BreadIcon 
              name="강릉" 
              isCity={true} 
              left={326} 
              top={174} 
              onClick={() => window.location.href = '/region/gangneung'} 
            />
            <BreadIcon 
              name="망원" 
              isCity={false} 
              left={7} 
              top={203} 
              onClick={() => handleBreadIconClick("망원", false)} 
            />
            <BreadIcon 
              name="성수" 
              isCity={false} 
              left={62} 
              top={227} 
              onClick={() => handleBreadIconClick("성수", false)} 
            />
            <BreadIcon 
              name="서면" 
              isCity={false} 
              left={336} 
              top={659} 
              onClick={() => handleBreadIconClick("서면", false)} 
            />
            <BreadIcon 
              name="서귀포" 
              isCity={false} 
              left={52} 
              top={1000} 
              onClick={() => handleBreadIconClick("서귀포", false)} 
            />
            <BreadIcon 
              name="전포" 
              isCity={false} 
              left={376} 
              top={671} 
              onClick={() => handleBreadIconClick("전포", false)} 
            />
            <BreadIcon 
              name="대전" 
              isCity={true} 
              left={141} 
              top={477} 
              onClick={() => handleBreadIconClick("대전", true)} 
            />
            <BreadIcon 
              name="여수" 
              isCity={true} 
              left={131} 
              top={783} 
              onClick={() => handleBreadIconClick("여수", true)} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}
