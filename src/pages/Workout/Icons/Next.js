import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={7} height={11} viewBox="0 0 7 11" fill="none">
      <Path d="M1.4 10.8L0 9.4L4 5.4L0 1.4L1.4 0L6.8 5.4L1.4 10.8Z" fill="white"/>
    </Svg>
  );
}

export default SvgComponent;
