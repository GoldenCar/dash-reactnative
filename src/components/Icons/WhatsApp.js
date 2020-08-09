import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M0 16.037l1.13-4.127A7.948 7.948 0 01.067 7.928C.069 3.538 3.642-.035 8.033-.035c2.132 0 4.132.83 5.636 2.335A7.914 7.914 0 0116 7.935c-.002 4.39-3.576 7.964-7.966 7.964H8.03a7.963 7.963 0 01-3.807-.97L0 16.037zm4.419-2.55l.242.144a6.612 6.612 0 003.37.923h.002a6.63 6.63 0 006.622-6.62 6.579 6.579 0 00-1.938-4.683 6.578 6.578 0 00-4.68-1.941 6.63 6.63 0 00-6.625 6.619c0 1.25.35 2.469 1.012 3.523l.158.25-.67 2.443 2.507-.657z"
        fill="#21293D"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.041 4.599c-.161-.388-.325-.336-.448-.342a7.98 7.98 0 00-.381-.007.731.731 0 00-.53.249c-.183.2-.698.68-.698 1.66 0 .98.714 1.926.813 2.059.1.132 1.404 2.142 3.4 3.004.476.205.846.328 1.135.42.477.151.911.13 1.254.078.383-.057 1.178-.481 1.344-.946.166-.465.166-.863.116-.946-.05-.083-.183-.133-.382-.233s-1.177-.58-1.36-.647c-.182-.066-.315-.1-.448.1-.132.199-.514.647-.63.78-.116.133-.232.15-.431.05-.2-.1-.84-.31-1.601-.988-.592-.528-.991-1.18-1.107-1.379-.116-.199-.013-.306.087-.406.09-.089.199-.232.299-.348.099-.116.132-.2.199-.332.066-.133.033-.25-.017-.349-.05-.1-.448-1.079-.614-1.477z"
        fill="#21293D"
      />
    </Svg>
  )
}

export default SvgComponent