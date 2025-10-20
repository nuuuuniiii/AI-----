import Image from 'next/image'
import Link from 'next/link'

// 이미지 상수들 (Figma에서 가져온 이미지들)
const imgMainBreadImg = "http://localhost:3845/assets/f002894694f41425ac23c1809814914245bbe725.png"
const imgPin = "http://localhost:3845/assets/4876b0ecb241041e897f4e51f2efe58a8e8fa0a1.svg"
const imgTumbsupIcon = "http://localhost:3845/assets/840d6f9ca2d0a6e8188c301f3049ca3b6484e53b.svg"
const imgEllipse16 = "http://localhost:3845/assets/e4b90dd2bd683732e0b7bfb33dcfcf2b359fe1de.png"
const img = "http://localhost:3845/assets/a838ee61ea2dfe4010412a285dfef05058eec7d5.png"
const img1 = "http://localhost:3845/assets/7a6114bfad87b12dbcd33dc5b5931079a893a36e.svg"
const img2 = "http://localhost:3845/assets/acce75ea1badd59ba5f146cddfea8fc1075c39c9.png"
const img3 = "http://localhost:3845/assets/82e1c3ae3c7c8d90232a432e1022ae7bb98d52fb.svg"
const img4 = "http://localhost:3845/assets/bfc6754a4d3e74494b71389136f5a4f34ab8bdb3.svg"
const img5 = "http://localhost:3845/assets/9c36a504956dd6c803ed62d9e58e4c9d2f47d40b.svg"

// RankCard 컴포넌트
function RankCard({ rank, storeName, recommendations, storeImage }: { 
  rank: string
  storeName: string
  recommendations: number
  storeImage: string
}) {
  return (
    <div className="bg-white h-[300px] md:h-[385px] overflow-hidden relative rounded-[20px] w-[280px] md:w-[317px]">
      <div className="absolute flex flex-col gap-[23px] items-center left-1/2 top-[42px] -translate-x-1/2 w-[140px]">
        <div className="flex flex-col gap-[12px] items-end relative w-full">
          <div className="h-[100px] w-[100px] md:h-[140px] md:w-[140px] relative">
            <div className="absolute left-0 size-full top-0">
              <div className="absolute left-0 size-full top-0">
                <img 
                  alt={storeName} 
                  className="block max-w-none size-full rounded-full object-cover" 
                  height="140" 
                  src={storeImage} 
                  width="140" 
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[2px] items-center leading-[1.4] relative text-[#473327] text-center w-full">
            <p className="font-['Bagel_Fat_One',_sans-serif] relative text-[18px] md:text-[20px] w-full">
              {rank}
            </p>
            <p className="font-['Pretendard',_sans-serif] font-semibold relative text-[20px] md:text-[24px] w-full">
              {storeName}
            </p>
          </div>
        </div>
        <div className="flex gap-[10px] items-center relative">
          <div className="relative size-[32px] md:size-[40px]">
            <img alt="" className="block max-w-none size-full" src={imgTumbsupIcon} />
          </div>
          <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[24px] md:text-[32px] text-[#473327] whitespace-nowrap">
            {recommendations}
          </p>
        </div>
      </div>
    </div>
  )
}

// GnbBtn 컴포넌트
function GnbBtn({ children, isActive = false }: { children: React.ReactNode, isActive?: boolean }) {
  return (
    <div className={`box-border flex gap-[10px] items-center justify-center px-[16px] md:px-[24px] py-[8px] relative rounded-[8px] ${
      isActive ? 'bg-[rgba(255,255,255,0.15)]' : 'bg-[rgba(255,255,255,0)]'
    }`}>
      <p className={`font-['Pretendard',_sans-serif] font-semibold leading-[1.4] relative text-[12px] md:text-[13px] text-center whitespace-nowrap ${
        isActive ? 'text-white' : 'text-[rgba(255,255,255,0.5)]'
      }`}>
        {children}
      </p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col items-start relative w-full min-h-screen">
      {/* GNB */}
      <div className="bg-[#473327] h-[90px] relative w-full">
        <div className="absolute flex gap-[5px] items-center left-[19px] top-1/2 -translate-y-1/2">
          <div className="h-[24px] relative w-[38px]">
            <div className="absolute h-[26px] -left-[1.58px] top-0 w-[41.167px]">
              <div className="absolute h-[26px] left-0 top-0 w-[41.167px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[320.83%] -left-[44.74%] max-w-none -top-[73.46%] w-[202.63%]" src={img} />
                </div>
              </div>
              <div className="absolute left-px size-[8px] top-[2px]">
                <img alt="" className="block max-w-none size-full" src={img1} />
              </div>
            </div>
          </div>
          <p className="font-['Bagel_Fat_One',_sans-serif] leading-[1.4] relative text-[24px] text-white whitespace-nowrap">
            빵지순례
          </p>
        </div>
        <div className="absolute flex gap-[8px] items-center right-[20px] top-1/2 -translate-y-1/2">
          <p className="font-['Pretendard',_sans-serif] font-semibold leading-[1.4] opacity-70 relative text-[15px] text-white whitespace-nowrap">
            Hyegyo Lee
          </p>
          <div className="relative size-[28px]">
            <img alt="" className="block max-w-none size-full" height="28" src={img2} width="28" />
          </div>
        </div>
        <div className="absolute bg-white flex h-[57px] items-center left-1/2 px-[20px] py-[8px] rounded-[30px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px]">
          <div className="flex items-center justify-between w-full">
            <p className="font-['Pretendard',_sans-serif] font-medium leading-normal text-[18px] text-[#d3ccc6] whitespace-nowrap">
              맛있는 빵을 검색해보세요
            </p>
            <div className="bg-[#473327] flex h-[40px] items-center justify-center rounded-[30px] w-[40px]">
              <div className="relative size-[24px]">
                <img alt="" className="block max-w-none size-full" src={img3} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
          <GnbBtn isActive>Home</GnbBtn>
          <GnbBtn>Others</GnbBtn>
          <GnbBtn>My Map</GnbBtn>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white flex flex-col items-start relative w-full">
        <div className="flex flex-col gap-[64px] items-center relative w-full px-4 py-16">
          <h1 className="font-['Bagel_Fat_One',_sans-serif] leading-[1.4] relative text-[120px] md:text-[179px] text-[#50392b] text-center uppercase w-full">
            Road To Bread
          </h1>
          <div className="flex flex-col gap-[62px] items-center relative w-full">
            {/* Main iconic */}
            <div className="flex items-end relative">
              <div className="h-[200px] w-[300px] md:h-[385px] md:w-[584px] relative">
                <img 
                  alt="Main bread" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" 
                  src={imgMainBreadImg} 
                />
              </div>
              <div className="h-[60px] w-[50px] md:h-[112.872px] md:w-[96.749px] relative">
                <img alt="Pin" className="block max-w-none size-full" src={imgPin} />
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="relative w-full flex justify-start pl-[70px]">
              <div className="flex flex-col gap-[7px] items-end w-[239px]">
                <Link href="/explore" className="bg-[#473327] border border-[#473327] border-solid flex items-center justify-between pl-[20px] pr-[4px] py-[12px] relative rounded-[100px] w-full hover:bg-[#3a2a1f] transition-colors">
                  <p className="font-['Helvetica_Neue',_sans-serif] font-bold leading-[1.4] relative text-[16px] md:text-[20px] text-white uppercase whitespace-nowrap">
                    다른 빵지순례자 보기
                  </p>
                  <div className="flex h-[32px] items-center justify-center relative w-[32px]">
                    <div className="flex-none rotate-[270deg]">
                      <div className="relative size-[32px]">
                        <img alt="" className="block max-w-none size-full" src={img4} />
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/my-map" className="bg-white border border-[#50392b] border-solid flex items-center justify-between pl-[20px] pr-[4px] py-[12px] relative rounded-[100px] w-full hover:bg-gray-50 transition-colors">
                  <p className="font-['Helvetica_Neue',_sans-serif] font-bold leading-[1.4] relative text-[16px] md:text-[20px] text-[#473327] uppercase whitespace-nowrap">
                    내 빵지순례지
                  </p>
                  <div className="flex h-[32px] items-center justify-center relative w-[32px]">
                    <div className="flex-none rotate-[270deg]">
                      <div className="relative size-[32px]">
                        <img alt="" className="block max-w-none size-full" src={img5} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Popular Courses Section */}
      <div className="bg-[#473327] flex flex-col gap-[74px] items-center justify-center pb-[114px] px-4 md:pl-[70px] md:pr-[36px] pt-[48px] relative w-full">
        <div className="flex flex-col items-start leading-[1.4] relative w-full">
          <h2 className="font-['Helvetica_Neue',_'Noto_Sans_KR',_sans-serif] font-bold relative text-[24px] md:text-[30px] text-white tracking-[-0.75px] uppercase w-full">
            이번달 인기 빵지순례코스
          </h2>
          <p className="font-['Pretendard',_sans-serif] font-semibold relative text-[16px] md:text-[18px] text-[#9a8779] w-full">
            매달 1일부터 가장 추천 많은 순위로 정해져요
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-[32px] md:gap-[96px] items-center relative w-full max-w-6xl">
          <RankCard 
            rank="1위" 
            storeName="브릭베이글" 
            recommendations={127} 
            storeImage={imgEllipse16}
          />
          <RankCard 
            rank="2위" 
            storeName="부산 서면" 
            recommendations={98} 
            storeImage={imgEllipse16}
          />
          <RankCard 
            rank="3위" 
            storeName="서울 성수" 
            recommendations={87} 
            storeImage={imgEllipse16}
          />
        </div>
      </div>
    </div>
  )
}