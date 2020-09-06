import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M6.66667 22H1.33333C0.596953 22 0 21.4816 0 20.8421V1.15789C0 0.518407 0.596953 0 1.33333 0H6.66667C7.40305 0 8 0.518407 8 1.15789V20.8421C8 21.4816 7.40305 22 6.66667 22Z"
        fill="#3F434F"
      />
      <Path
        d="M20.6667 22H15.3333C14.597 22 14 21.4816 14 20.8421V1.15789C14 0.518407 14.597 0 15.3333 0H20.6667C21.403 0 22 0.518407 22 1.15789V20.8421C22 21.4816 21.403 22 20.6667 22Z"
        fill="#3F434F"
      />
    </Svg>
  );
}

export default SvgComponent;
