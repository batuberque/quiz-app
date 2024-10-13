export const parseOptions = (body: string): string[] => {
  const lines = body.split("\n").filter((line) => line.trim() !== "");
  const options = lines.slice(0, 4);

  return options;
};
