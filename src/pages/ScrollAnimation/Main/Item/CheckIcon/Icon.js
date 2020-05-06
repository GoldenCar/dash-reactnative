import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Path d="M437.019 74.98C388.667 26.629 324.38 0 256 0 187.619 0 123.332 26.629 74.98 74.98 26.629 123.332 0 187.62 0 256s26.629 132.667 74.98 181.019C123.332 485.371 187.62 512 256 512s132.667-26.629 181.019-74.98C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.981-181.02zm-58.713 120.093L235.241 338.139a14.953 14.953 0 01-10.606 4.393 14.953 14.953 0 01-10.607-4.393l-80.334-80.333c-5.858-5.857-5.858-15.354 0-21.213 5.857-5.858 15.355-5.858 21.213 0l69.728 69.727 132.458-132.46c5.857-5.858 15.355-5.858 21.213 0 5.858 5.858 5.858 15.355 0 21.213z" />
    </Svg>
  )
}

export default SvgComponent
