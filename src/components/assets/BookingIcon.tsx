import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const BookingIcon: React.FC<Props> = ({
  width = 25,
  height = 24,
  color = '#898989',
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M16.333 2V6M8.33301 2V6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.333 4H11.333C7.56177 4 5.67616 4 4.50458 5.17157C3.33301 6.34315 3.33301 8.22876 3.33301 12V14C3.33301 17.7712 3.33301 19.6569 4.50458 20.8284C5.67616 22 7.56177 22 11.333 22H13.333C17.1042 22 18.9899 22 20.1614 20.8284C21.333 19.6569 21.333 17.7712 21.333 14V12C21.333 8.22876 21.333 6.34315 20.1614 5.17157C18.9899 4 17.1042 4 13.333 4Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.33301 10H21.333"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.3285 14H12.3375M12.3285 18H12.3375M16.324 14H16.333M8.33301 14H8.34198M8.33301 18H8.34198"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BookingIcon;
