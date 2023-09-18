import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  bgColor?: string;
}
function SkeletonBox({
  width,
  height,
  bgColor = 'bg-gray-100',
  ...props
}: IProps) {
  const className = `${width} ${height} ${bgColor} animate-pulse ${props.className}`;
  return <div className={className} {...props}></div>;
}

export default SkeletonBox;
