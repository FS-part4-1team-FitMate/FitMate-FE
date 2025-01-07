export default function Title({ title }: { title: string }) {
  return (
    <div className="max-w-[192rem] py-[3.2rem] px-[26rem]">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}
