import React from "react";
import Svg, { Path, Defs, G, ClipPath, Rect } from "react-native-svg";

interface Props {
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}

const WarpcastLogo = ({ width, height }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 1260 1260" fill="none">
    <G clipPath="url(#clip0_1_2)">
      <Path
        d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z"
        fill="#472A91"
      ></Path>
      <Path
        d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z"
        fill="white"
      ></Path>
    </G>
    <Defs>
      <ClipPath id="clip0_1_2">
        <Rect width="1259.61" height="1259.61" fill="white"></Rect>
      </ClipPath>
    </Defs>
  </Svg>
);

export default WarpcastLogo;
