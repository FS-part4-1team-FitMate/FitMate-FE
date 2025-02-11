export function calcAvgRating(reviewStat: { count: number; rating: number }[]) {
  let total = 0;
  let sum = 0;
  for (let stat of reviewStat) {
    total += stat.count;
    sum += stat.count * stat.rating;
  }
  if (total !== 0) {
    return sum / total;
  } else {
    return 0;
  }
}
