import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressBarProps {
  percentage: number;
  className?: string;
  strokeWidth?: number;
}

const CircularProgressBar = ({
  percentage,
  strokeWidth = 5,
  className = "",
}: CircularProgressBarProps) => {
  const [radius, setRadius] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    const size = Math.min(height, width);
    setRadius((size - strokeWidth) / 2);
  };

  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth / 2;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View
      className={`flex-1 aspect-square justify-center items-center -rotate-90 absolute w-full h-full ${className}`}
      onLayout={onLayout}
    >
      {radius > 0 && (
        <Svg
          width={radius * 2 + strokeWidth}
          height={radius * 2 + strokeWidth}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        >
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#9ca3af"
            strokeWidth={strokeWidth / 2}
            fill="transparent"
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
      )}
    </View>
  );
};

export default CircularProgressBar;
