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
