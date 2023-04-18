interface IDividerProp {
  type: 'horizental' | 'vertical';
  margin: 1 | 4 | 8 | 16;
  thin: 1 | 2 | 4 | 8;
}

const widthStyle = {
  1: 'w-[1px]',
  2: 'w-0.5',
  4: 'w-1',
  8: 'w-2',
};

const mxStyle = {
  1: 'mx-1',
  4: 'mx-4',
  8: 'mx-8',
  16: 'mx-16',
};

const myStyle = {
  1: 'my-1',
  4: 'my-4',
  8: 'my-8',
  16: 'my-16',
};

export default function Divider({
  type,
  margin,
  thin,
  ...props
}: IDividerProp) {
  const horizentalStyle = `block width-full w-auto h-[${thin}px] ${myStyle[margin]}`;
  const verticalStyle = `relative top-[-1px] inline-block ${widthStyle[thin]} h-full my-0 ${mxStyle[margin]} align-middle`;
  const hrStyle = type === 'horizental' ? horizentalStyle : verticalStyle;
  return <hr className={`border-none bg-slate-400 ${hrStyle}`} {...props} />;
}
