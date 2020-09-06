import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={20} height={24} viewBox="0 0 20 24" fill="none">
      <Path
        d="M4.61063 0.934038C2.61346 -0.336891 0 1.09775 0 3.46502V20.535C0 22.9023 2.61345 24.3369 4.61063 23.066L18.0227 14.531C19.8752 13.3521 19.8752 10.6479 18.0227 9.46902L4.61063 0.934038Z"
        fill="#3F434F"
      />
    </Svg>
  );
}


export default SvgComponent;
