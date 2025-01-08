export function VerticalLine({ height }: { height: string }) {
  return <div className={`border border-line-200 w-0`} style={{ height: height }}></div>;
}

export function HorizontalLine({ width }: { width: string }) {
  return <div className="border border-line-100 h-0" style={{ width: width }}></div>;
}
