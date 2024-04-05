export const getNorwegianCurrentTime = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Oslo" }));
