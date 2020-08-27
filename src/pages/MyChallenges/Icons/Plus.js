import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
    return (
        <Svg width={10} height={10} viewBox="0 0 10 10" fill={props.fill || "#3F434F"} {...props}>
            <Path
                d="M6.125 1.625C6.125 1.00368 5.62132 0.5 5 0.5C4.37868 0.5 3.875 1.00368 3.875 1.625V3.875H1.625C1.00368 3.875 0.5 4.37868 0.5 5C0.5 5.62132 1.00368 6.125 1.625 6.125H3.875V8.375C3.875 8.99632 4.37868 9.5 5 9.5C5.62132 9.5 6.125 8.99632 6.125 8.375V6.125H8.375C8.99632 6.125 9.5 5.62132 9.5 5C9.5 4.37868 8.99632 3.875 8.375 3.875H6.125V1.625Z" stroke={props.stroke || "#fff"}
            />
        </Svg>
    );
}

export default SvgComponent;
