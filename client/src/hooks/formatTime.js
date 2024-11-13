export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};
