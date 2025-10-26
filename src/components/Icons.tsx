'use client';

export function PinIcon() {
  return (
    <div className="size-[41px] relative">
      <img src="/images/Pin.png" alt="Pin" className="w-full h-full object-contain" />
    </div>
  );
}

export function SearchIcon() {
  return (
    <div className="bg-[#473327] flex items-center justify-center rounded-[30px] w-[41px] h-[40px]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export function NotIcon() {
  return (
    <div className="size-[32px]">
      <img src="/images/Not icon.png" alt="Not" className="w-full h-full object-contain" />
    </div>
  );
}

export function StarIcon() {
  return (
    <div className="size-[32px]">
      <img src="/images/Star icon.png" alt="Star" className="w-full h-full object-contain" />
    </div>
  );
}

export function ClockIcon() {
  return (
    <div className="size-[32px]">
      <img src="/images/Clock icon.png" alt="Clock" className="w-full h-full object-contain" />
    </div>
  );
}

export function BreadIcon({ count = 1 }: { count?: number }) {
  return (
    <div className="size-[32px] relative flex flex-col items-center justify-center">
      <img src="/images/Not icon.png" alt="Bread" className="w-full h-full object-contain" />
      <p className="absolute font-semibold text-[16px] text-white uppercase">
        {count}
      </p>
    </div>
  );
}

export function ThumbsUpIcon() {
  return (
    <div className="size-[40px]">
      <img src="/images/Tumbsup icon_brown.png" alt="Thumbs Up" className="w-full h-full object-contain" />
    </div>
  );
}

export function ThumbsUpIconWhite() {
  return (
    <div className="size-[40px]">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M25.05 16.14H31.6583C32.195 16.14 32.725 16.2734 33.2 16.5267C33.675 16.78 34.0867 17.15 34.395 17.6017C34.7027 18.0569 34.8995 18.5779 34.9696 19.123C35.0396 19.668 34.981 20.2218 34.7983 20.74L30.865 32.7417C30.385 34.0984 30.065 35 27.725 35C24.2717 35 20.5983 33.8717 17.4633 32.9067C16.6767 32.665 15.9233 32.4334 15.2167 32.2334H15.025V15.7967C17.7881 13.0703 20.1646 9.97823 22.0883 6.60671C22.4118 5.98421 22.9431 5.49473 23.59 5.22338C24.231 4.95611 24.9465 4.92772 25.6067 5.14338C26.2667 5.36004 26.8333 5.80504 27.2067 6.40504C27.5817 7.00504 27.74 7.71838 27.655 8.42338L25.05 16.14ZM6.96167 16.6667H11.6667V30C11.6667 30.8841 11.3155 31.7319 10.6904 32.3571C10.0652 32.9822 9.21739 33.3334 8.33333 33.3334C7.44928 33.3334 6.60143 32.9822 5.97631 32.3571C5.35119 31.7319 5 30.8841 5 30V18.6284C5 17.545 5.88 16.6667 6.96167 16.6667Z" fill="white"/>
      </svg>
    </div>
  );
}

export function MapBreadIcon({ 
  name, 
  isCity, 
  left, 
  top, 
  onClick 
}: { 
  name: string;
  isCity: boolean;
  left: number;
  top: number;
  onClick: () => void;
}) {
  return (
    <div 
      className="absolute cursor-pointer box-border flex flex-col gap-[10px] items-center justify-center overflow-clip px-0 py-[3px] w-[55px]"
      style={{ left: `${left}px`, top: `${top}px` }}
      onClick={onClick}
    >
      {/* Bread Icon */}
      <div className="h-[48.125px] relative shrink-0 w-[55px]">
        <svg width="55" height="48.125" viewBox="0 0 55 48.125" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_375_13635)">
            <path d="M47.5 23C40.625 23 20 26.4375 20 40.1875C20 43.9795 23.083 47.0625 26.875 47.0625V65.9688C26.875 68.8154 29.1846 71.125 32.0312 71.125H62.9688C65.8154 71.125 68.125 68.8154 68.125 65.9688V47.0625C71.917 47.0625 75 43.9795 75 40.1875C75 26.4375 54.375 23 47.5 23Z" fill={isCity ? "#473327" : "white"} transform="translate(-20, -20)"/>
          </g>
          <defs>
            <filter id="filter0_d_375_13635" x="0" y="0" width="63" height="56.125" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_375_13635"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_375_13635" result="shape"/>
            </filter>
          </defs>
        </svg>
      </div>
      
      {/* Text positioned absolutely in the center of the icon area */}
      <p className={`absolute font-semibold text-[20px] leading-[140%] text-center uppercase whitespace-nowrap ${name === '서귀포' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'inset-[25.45%_18.18%_22.81%_18.18%]'}`} style={{ color: isCity ? 'white' : '#473327' }}>
        {name}
      </p>
    </div>
  );
}

export function KoreaMapWithBreadIcon() {
  return (
    <div className="w-[689px] h-[1060px] relative">
      <svg width="689" height="1060" viewBox="0 0 689 1060" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main Korea Map */}
        <g filter="url(#filter0_d_513_3268)">
          <path d="M44.0574 182.42L342.467 4.01129C346.292 1.7243 351.224 2.66431 353.94 6.19808L439.649 117.723C440.09 118.298 440.459 118.925 440.747 119.59L513.27 287.369C513.675 288.305 513.914 289.305 513.976 290.324L527.466 513.441C527.815 519.205 533.534 523.07 539.012 521.244L540.817 520.643C547.062 518.561 553.293 523.834 552.273 530.337L528.583 681.361C528.306 683.13 527.494 684.772 526.257 686.068L413.112 804.499C411.543 806.141 409.399 807.112 407.13 807.208L307.774 811.391C306.833 811.431 305.904 811.622 305.023 811.956L20.6896 920.024C14.941 922.209 8.78442 917.963 8.78442 911.813V747.133C8.78442 744.732 9.7678 742.435 11.5057 740.777L78.1654 677.194C79.462 675.957 80.3494 674.353 80.7085 672.598L109.1 533.796C109.552 531.586 109.136 529.286 107.939 527.374L39.7721 418.511C37.6811 415.172 38.0693 410.848 40.7218 407.935L101.758 340.895C102.716 339.844 103.403 338.575 103.762 337.199L114.702 295.264C115.7 291.437 114.018 287.414 110.592 285.438L36.095 242.459C32.8854 240.607 31.1829 236.941 31.8394 233.294L39.9196 188.403C40.3694 185.905 41.8783 183.723 44.0574 182.42Z" fill="#D3CCC6"/>
        </g>
        <g filter="url(#filter1_d_513_3268)">
          <path d="M107.987 948.849L27.6021 985.022C26.0696 985.712 24.7671 986.827 23.849 988.234L11.6274 1006.97C9.87436 1009.66 9.72662 1013.09 11.242 1015.92L22.7713 1037.44C24.3006 1040.3 27.2762 1042.08 30.5145 1042.08H96.1881C97.2054 1042.08 98.2149 1041.9 99.1717 1041.56L133.359 1029.21C135.826 1028.32 137.766 1026.37 138.648 1023.9L151.703 987.351C152.922 983.936 151.919 980.124 149.176 977.752L117.338 950.216C114.752 947.98 111.104 947.446 107.987 948.849Z" fill="#D3CCC6"/>
        </g>
        <g filter="url(#filter2_d_513_3268)">
          <path d="M598.814 258.458L580.067 261.136C577.148 261.553 574.633 263.407 573.371 266.072L566.756 280.037C565.947 281.744 565.71 283.667 566.081 285.52L570.448 307.357C570.807 309.153 571.718 310.791 573.054 312.043L586.034 324.212C587.663 325.739 589.811 326.588 592.042 326.588H603.613C607.671 326.588 611.2 323.809 612.152 319.865L617.634 297.153C618.015 295.578 617.952 293.929 617.453 292.388L608.414 264.45C607.099 260.383 603.046 257.853 598.814 258.458Z" fill="#D3CCC6"/>
        </g>
        <g filter="url(#filter3_d_513_3268)">
          <path d="M658.167 268.851L649.969 272.13C646.52 273.51 644.311 276.911 644.454 280.624L645.19 299.759C645.27 301.839 646.086 303.823 647.492 305.357L651.763 310.016C654.919 313.459 660.218 313.83 663.823 310.861L673.471 302.916C675.138 301.543 676.24 299.605 676.569 297.471L679.201 280.362C679.904 275.79 676.941 271.455 672.424 270.452L663.335 268.432C661.61 268.048 659.808 268.194 658.167 268.851Z" fill="#D3CCC6"/>
        </g>
        
        <defs>
          {/* Filters for main map */}
          <filter id="filter0_d_513_3268" x="0.000109673" y="2.76593" width="561.168" height="935.408" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="8.78431"/>
            <feGaussianBlur stdDeviation="4.39216"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_513_3268"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_513_3268" result="shape"/>
          </filter>
          <filter id="filter1_d_513_3268" x="1.41661" y="948.075" width="159.583" height="111.572" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="8.78431"/>
            <feGaussianBlur stdDeviation="4.39216"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_513_3268"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_513_3268" result="shape"/>
          </filter>
          <filter id="filter2_d_513_3268" x="557.126" y="258.369" width="69.5384" height="85.788" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="8.78431"/>
            <feGaussianBlur stdDeviation="4.39216"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_513_3268"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_513_3268" result="shape"/>
          </filter>
          <filter id="filter3_d_513_3268" x="635.663" y="268.223" width="52.4252" height="62.2107" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="8.78431"/>
            <feGaussianBlur stdDeviation="4.39216"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_513_3268"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_513_3268" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export function EditIcon() {
  return (
    <div className="size-[32px]">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.6026 7.36342L24.5912 4.38079C24.3324 4.13636 23.9885 4 23.6309 4C23.2732 4 22.9293 4.13636 22.6705 4.38079L19.9928 7.04098H5.62777C5.19606 7.04098 4.78203 7.21084 4.47676 7.51319C4.1715 7.81554 4 8.22562 4 8.65321V26.3878C4 26.8154 4.1715 27.2254 4.47676 27.5278C4.78203 27.8301 5.19606 28 5.62777 28H23.5332C23.9649 28 24.3789 27.8301 24.6842 27.5278C24.9895 27.2254 25.161 26.8154 25.161 26.3878V11.6842L27.6026 9.26586C27.8571 9.01345 28 8.67134 28 8.31464C28 7.95795 27.8571 7.61583 27.6026 7.36342ZM16.0699 18.4314L12.6597 19.1811L13.4736 15.8357L21.2462 8.12117L23.875 10.7249L16.0699 18.4314ZM24.754 9.80596L22.1252 7.2022L23.6309 5.71089L26.2597 8.31464L24.754 9.80596Z" fill="#846D5C"/>
      </svg>
    </div>
  );
}

export function StarIconBrown() {
  return (
    <div className="size-[32px]">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 23.0333L10.4666 26.3666C10.2222 26.5222 9.96662 26.5888 9.69995 26.5666C9.43328 26.5444 9.19995 26.4555 8.99995 26.2999C8.79995 26.1444 8.64439 25.9502 8.53328 25.7173C8.42217 25.4844 8.39995 25.223 8.46662 24.9333L9.93328 18.6333L5.03328 14.3999C4.81106 14.1999 4.67239 13.9719 4.61728 13.7159C4.56217 13.4599 4.57862 13.2102 4.66662 12.9666C4.75462 12.723 4.88795 12.523 5.06662 12.3666C5.24528 12.2102 5.48973 12.1102 5.79995 12.0666L12.2666 11.4999L14.7666 5.5666C14.8777 5.29994 15.0502 5.09993 15.284 4.9666C15.5177 4.83327 15.7564 4.7666 16 4.7666C16.2435 4.7666 16.4822 4.83327 16.716 4.9666C16.9497 5.09993 17.1222 5.29994 17.2333 5.5666L19.7333 11.4999L26.1999 12.0666C26.5111 12.111 26.7555 12.211 26.9333 12.3666C27.1111 12.5222 27.2444 12.7222 27.3333 12.9666C27.4222 13.211 27.4391 13.4613 27.3839 13.7173C27.3288 13.9733 27.1897 14.2008 26.9666 14.3999L22.0666 18.6333L23.5333 24.9333C23.6 25.2222 23.5777 25.4835 23.4666 25.7173C23.3555 25.951 23.2 26.1453 23 26.2999C22.8 26.4546 22.5666 26.5435 22.3 26.5666C22.0333 26.5897 21.7777 26.523 21.5333 26.3666L16 23.0333Z" fill="#846D5C"/>
      </svg>
    </div>
  );
}

export function ClockIconBrown() {
  return (
    <div className="size-[32px]">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.0002 5.60787C23.8102 6.6529 25.3158 8.1525 26.3681 9.95823C27.4203 11.764 27.9827 13.8132 27.9996 15.9031C28.0165 17.993 27.4873 20.051 26.4643 21.8735C25.4413 23.696 23.9601 25.2197 22.1673 26.2939C20.3745 27.368 18.3322 27.9553 16.2427 27.9975C14.1531 28.0398 12.0888 27.5357 10.2539 26.535C8.41913 25.5343 6.87748 24.0717 5.78162 22.2921C4.68576 20.5125 4.07369 18.4775 4.006 16.3887L4 15.9999L4.006 15.6111C4.0732 13.5387 4.67627 11.519 5.75639 9.74906C6.83651 7.9791 8.35684 6.51921 10.1691 5.51173C11.9815 4.50425 14.0239 3.98355 16.0974 4.0004C18.1708 4.01725 20.2045 4.57107 22.0002 5.60787ZM16.0001 8.79987C15.7062 8.79991 15.4225 8.90782 15.2029 9.10313C14.9832 9.29844 14.8429 9.56757 14.8085 9.85947L14.8001 9.99987V15.9999L14.8109 16.1571C14.8383 16.3653 14.9198 16.5626 15.0473 16.7295L15.1517 16.8495L18.7518 20.4495L18.8646 20.5479C19.075 20.7111 19.3338 20.7998 19.6002 20.7998C19.8666 20.7998 20.1254 20.7111 20.3358 20.5479L20.4486 20.4483L20.5482 20.3355C20.7115 20.125 20.8001 19.8662 20.8001 19.5999C20.8001 19.3335 20.7115 19.0747 20.5482 18.8643L20.4486 18.7515L17.2002 15.5019V9.99987L17.1918 9.85947C17.1574 9.56757 17.017 9.29844 16.7974 9.10313C16.5778 8.90782 16.2941 8.79991 16.0001 8.79987Z" fill="#846D5C"/>
      </svg>
    </div>
  );
}

export function BreadIconBrown({ number = 1 }: { number?: number }) {
  return (
    <div className="size-[32px] relative">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_375_13794)">
          <g filter="url(#filter0_d_375_13794)">
            <path d="M16 4C12.75 4 3 5.71429 3 12.5714C3 14.4625 4.45742 16 6.25 16V25.4286C6.25 26.8482 7.3418 28 8.6875 28H23.3125C24.6582 28 25.75 26.8482 25.75 25.4286V16C27.5426 16 29 14.4625 29 12.5714C29 5.71429 19.25 4 16 4Z" fill="#846D5C"/>
          </g>
        </g>
        <defs>
          <filter id="filter0_d_375_13794" x="0.0909092" y="4" width="31.8182" height="29.8182" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2.90909"/>
            <feGaussianBlur stdDeviation="1.45455"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_375_13794"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_375_13794" result="shape"/>
          </filter>
          <clipPath id="clip0_375_13794">
            <rect width="32" height="32" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <p className="absolute inset-0 flex items-center justify-center font-semibold text-[16px] text-white uppercase">
        {number}
      </p>
    </div>
  );
}

// Figma에서 가져온 이미지 상수
const imgVector = "http://localhost:3845/assets/47cdd901bba667f46098d1c7381208398be9ebd6.svg";

export function BreadIconBrownExplore({ number = 1 }: { number?: number }) {
  return (
    <div className="flex flex-col gap-[10px] items-center justify-center overflow-clip px-0 py-[3px] relative size-[44px]">
      <div className="h-[33px] relative w-[35.75px]">
        <div className="absolute bottom-[-24.24%] left-[-11.19%] right-[-11.19%] top-0">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
      <p className="absolute font-['Pretendard',_sans-serif] font-semibold inset-[18.75%_40%_25.36%_40%] leading-[1.4] text-[22px] text-center text-white uppercase">
        {number}
      </p>
    </div>
  );
}


