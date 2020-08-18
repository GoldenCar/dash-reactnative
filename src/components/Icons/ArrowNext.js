import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
      <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M1.99961 11.3996L0.599609 9.99961L4.59961 5.99961L0.599609 1.99961L1.99961 0.599609L7.39961 5.99961L1.99961 11.3996Z" fill="black"/>
      </Svg>

  );
}

export default SvgComponent;
