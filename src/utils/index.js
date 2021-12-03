export const getDifferenceInDays = date => {
  const diffInMs = Math.abs(new Date() - date);
  return diffInMs / (1000 * 60 * 60 * 24);
}