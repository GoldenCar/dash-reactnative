import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={props.height || 348}
      viewBox="0 0 24 348"
      fill="none"
      preserveAspectRatio="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 36C23 32.6863 20.3137 30 17 30C13.6863 30 11 32.6863 11 36C11 39.3137 13.6863 42 17 42C20.3137 42 23 39.3137 23 36ZM17 32C19.2091 32 21 33.7909 21 36C21 38.2091 19.2091 40 17 40C14.7909 40 13 38.2091 13 36C13 33.7909 14.7909 32 17 32Z"
        fill="#E0EAF3"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7071 16.0761C11.0976 15.6856 11.7308 15.6856 12.1213 16.0761L16.849 20.8038L21.5766 16.0761C21.9672 15.6856 22.6003 15.6856 22.9908 16.0761C23.3814 16.4666 23.3814 17.0998 22.9908 17.4903L16.849 23.6322L10.7071 17.4903C10.3166 17.0998 10.3166 16.4666 10.7071 16.0761Z"
        fill="#E0EAF3"
      />
      <Path
        d="M17 20V9C17 4.58172 13.4183 1 9 1V1C4.58172 1 1 4.58172 1 9V45"
        stroke="#E0EAF3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M0.999975 45.5L0.999975 339C0.999975 343.418 4.5817 347 8.99999 347V347C13.4183 347 17 343.418 17 339L17 41.5"
        stroke="#E0EAF3"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
