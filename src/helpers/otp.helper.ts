export const generateOtp = () =>
  Math.floor(1000 + Math.random() * 9000)
    .toString()
    .slice(0, 4);
