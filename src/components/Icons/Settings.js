import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={4} height={16} viewBox="0 0 4 16" fill="none" {...props}>
      <Path
        d="M4 8C4 6.89543 3.10457 6 2 6C0.89543 6 -1.35705e-07 6.89543 -8.74228e-08 8C-3.91405e-08 9.10457 0.89543 10 2 10C3.10457 10 4 9.10457 4 8Z"
        fill="#fff"
      />
      <Path
        d="M4 14C4 12.8954 3.10457 12 2 12C0.89543 12 -1.35705e-07 12.8954 -8.74228e-08 14C-3.91405e-08 15.1046 0.89543 16 2 16C3.10457 16 4 15.1046 4 14Z"
        fill="#fff"
      />
      <Path
        d="M4 2C4 0.89543 3.10457 -1.35705e-07 2 -8.74228e-08C0.89543 -3.91405e-08 -1.35705e-07 0.895431 -8.74228e-08 2C-3.91405e-08 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2Z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
