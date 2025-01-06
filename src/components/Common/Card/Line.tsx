export function VerticalLine({ height }: { height: string }) {
  return <div className={`border border-line-200 w-0`} style={{ height: height }}></div>;
}

export function HorizontalLine() {
  return <div className="border border-line-200 w-[87.1rem] h-0"></div>;
}
