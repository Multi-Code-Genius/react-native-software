import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const VenueIcon: React.FC<Props> = ({
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
      d="M2.16699 8.57143C2.16699 6.41644 2.16699 5.33894 2.75278 4.66947C3.33856 4 4.28137 4 6.16699 4H18.167C20.0526 4 20.9954 4 21.5812 4.66947C22.167 5.33894 22.167 6.41644 22.167 8.57143V15.4286C22.167 17.5836 22.167 18.6611 21.5812 19.3305C20.9954 20 20.0526 20 18.167 20H6.16699C4.28137 20 3.33856 20 2.75278 19.3305C2.16699 18.6611 2.16699 17.5836 2.16699 15.4286V8.57143Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M12.167 14C13.2716 14 14.167 13.1046 14.167 12C14.167 10.8954 13.2716 10 12.167 10C11.0624 10 10.167 10.8954 10.167 12C10.167 13.1046 11.0624 14 12.167 14Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M12.167 10V5M12.167 14V19"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.167 9H19.667C19.1147 9 18.667 9.44772 18.667 10V14C18.667 14.5523 19.1147 15 19.667 15H22.167"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.16699 9H4.66699C5.21927 9 5.66699 9.44772 5.66699 10V14C5.66699 14.5523 5.21927 15 4.66699 15H2.16699"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default VenueIcon;
