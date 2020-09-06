import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={7} height={11} viewBox="0 0 7 11" fill="none">
      <Path 
        d="M5.6 0.200001L7 1.6L3 5.6L7 9.6L5.6 11L0.200001 5.6L5.6 0.200001Z" 
        fill="white"
      />
    </Svg>
  );
}

export default SvgComponent;
