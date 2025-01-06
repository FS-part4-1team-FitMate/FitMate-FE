const thetas = [];
const coss = [];
const sins = [];
for (let i = 0; i < 10; i++) {
  thetas.push(-Math.PI / 2 + ((2 * Math.PI) / 10) * i);
  coss.push(Math.cos(thetas[i]));
  sins.push(Math.sin(thetas[i]));
}
