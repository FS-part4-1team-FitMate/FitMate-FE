const thetas: number[] = [];
const coss: number[] = [];
const sins: number[] = [];
for (let i = 0; i < 10; i++) {
  thetas.push(-Math.PI / 2 + ((2 * Math.PI) / 10) * i);
  coss.push(Math.cos(thetas[i]));
  sins.push(Math.sin(thetas[i]));
}

interface Props {
  r?: number; // Outer radius
  r0?: number; // Inner radius
  pad?: number; // Padding between stars
  pad0?: number; // Padding left-end, right-end
  rating: number; // Rating (0 ~ 1)
}

function StarPoints({ r = 12, r0 = 7, pad = 1, pad0 = 9, rating = 0 }: Props) {
  let str = `${pad0},0 `;
  let yc = pad + r;
  let xc = pad0 + pad + r;
  for (let k = 0; k < 5; k++, xc += 2 * r + pad) {
    str += `${xc},0 `;
    for (let i = 0; i < 10; i++) {
      let rp = i % 2 === 0 ? r : r0;
      str += `${(xc + rp * coss[i]).toFixed(2)},${(yc + rp * sins[i]).toFixed(2)} `;
    }
    str += `${xc},${pad} ${xc},0 `;
  }
  xc -= r;
  yc += r * sins[4] + pad;
  str += `${xc},0 ${xc},${yc.toFixed(2)} ${pad0},${yc.toFixed(2)}`;

  const starsWidth = xc - pad0 - 2;
  if (rating < 0) {
    rating = 0;
  } else if (rating > 1) {
    rating = 1;
  }

  return (
    <div className="relative" style={{ width: `${xc + pad0}px`, height: `${yc.toFixed(2)}px` }}>
      <div
        className="absolute bg-yellow-400"
        style={{
          left: `${pad0 + pad}px`,
          top: `${pad}px`,
          bottom: `${pad}px`,
          width: `${(starsWidth * rating).toFixed(2)}px`,
        }}
      ></div>
      <svg className="absolute left-0 top-0 w-full h-full">
        <polygon
          style={{ fill: "white", stroke: "black", strokeWidth: 0, fillRule: "evenodd" }}
          points={str}
        />
      </svg>
    </div>
  );
}

export default StarPoints;
