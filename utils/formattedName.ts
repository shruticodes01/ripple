export const formatName = (fullName: string) => {
  const formattedName = fullName
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");

  return formattedName;
};
