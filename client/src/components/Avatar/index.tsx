import { positionStyle } from '@/styles/styleConstant';

interface IAvatarProp {
  src: string | null;
  alt: string;
  hasDot: boolean;
  position?: 'topRight' | 'bottomRight' | 'topLeft' | 'bottomLeft';
}

export default function Avatar({ src, alt, hasDot, position }: IAvatarProp) {
  const backgroundColor = src ? '' : 'bg-slate-400';
  return (
    <div
      className={`relative rounded-full ${backgroundColor} border border-slate-200 w-[80px] h-[80px] max-w-[100px] max-h-[100px] overflow-hidden`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <></>
      )}
      {hasDot && (
        <div
          className={`${
            positionStyle[position!]
          } absolute z-10 bg-white rounded-full p-4`}
        />
      )}
    </div>
  );
}
