import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

const HomeIcon = ({ color = 'white', size = 24 }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* First path */}
      <Path
        d="M8.99931 22L8.74868 18.4911C8.61393 16.6046 10.108 15 11.9993 15C13.8906 15 15.3847 16.6046 15.2499 18.4911L14.9993 22"
        stroke={color}
        strokeWidth={1.5}
      />
      {/* Second path */}
      <Path
        d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.383 2 14.5817 2.86667 16.979 4.6L18.4188 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5536 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
