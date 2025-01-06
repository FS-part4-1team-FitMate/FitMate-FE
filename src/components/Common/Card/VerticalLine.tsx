export default function VerticalLine({ height }: { height: string }) {
  return <div className={`border border-line-200 w-0 h-[${height}]`}></div>;
}
