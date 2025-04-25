import { StarTypeExtends } from "~/types/starType";

export const starsParser = (stars: StarTypeExtends[]) => {
  if (stars.length === 0) {
    return 0;
  }

  const sumOfStars = stars
    .map((star) => star.star)
    .reduce((prev, curr) => prev + curr);
  const lengthofStars = stars.length;

  return sumOfStars / lengthofStars;
};
