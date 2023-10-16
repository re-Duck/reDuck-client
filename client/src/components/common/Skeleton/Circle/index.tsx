import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  bgColor?: string;
  rounded?: string;
}
function SkeletonCircle({
  width,
  height,
  bgColor = 'bg-gray-100',
  rounded = 'rounded-full',
  ...props
}: IProps) {
  const className = `${width} ${height} ${bgColor} ${rounded} animate-pulse ${props.className}`;
  return <div className={className} {...props}></div>;
}

export default SkeletonCircle;
