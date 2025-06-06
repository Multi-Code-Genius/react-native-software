import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ProfileIcon = ({
  width = 25,
  height = 25,
  color = '#898989',
}: IconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15.5 10.5C15.5 8.84315 14.1569 7.5 12.5 7.5C10.8431 7.5 9.5 8.84315 9.5 10.5C9.5 12.1569 10.8431 13.5 12.5 13.5C14.1569 13.5 15.5 12.1569 15.5 10.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 18.5C17.5 15.7386 15.2614 13.5 12.5 13.5C9.73858 13.5 7.5 15.7386 7.5 18.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.5 13.5V11.5C21.5 7.72876 21.5 5.84315 20.3284 4.67157C19.1569 3.5 17.2712 3.5 13.5 3.5H11.5C7.72876 3.5 5.84315 3.5 4.67157 4.67157C3.5 5.84315 3.5 7.72876 3.5 11.5V13.5C3.5 17.2712 3.5 19.1569 4.67157 20.3284C5.84315 21.5 7.72876 21.5 11.5 21.5H13.5C17.2712 21.5 19.1569 21.5 20.3284 20.3284C21.5 19.1569 21.5 17.2712 21.5 13.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
