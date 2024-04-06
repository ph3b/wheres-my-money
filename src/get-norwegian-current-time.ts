export const currentNorwayTime = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Oslo" }));
