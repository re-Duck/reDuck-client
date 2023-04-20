interface IIconProp {
  name: string;
  size: number;
  strokeWidth: number;
  color: string;
}

export default function Icon({ name, size, strokeWidth, color }: IIconProp) {
  const iconStyle = {
    'stroke-width': strokeWidth,
    'stroke': color,
    'width': size,
    'height': size,
  };
  const icon = require('feather-icons').icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : '';
  const decode = decodeURIComponent(encodeURIComponent(svg));
  const base64 = Buffer.from(decode).toString('base64');
  return (
    <div className="inline-block">
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </div>
  );
}
