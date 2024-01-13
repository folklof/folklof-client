export const getFirstAndSecondName = (text: string) => {
  const words = text.split(" ");
  if (words.length >= 2) {
    return `${words[0]} ${words[1]}`;
  }
  return text;
};
