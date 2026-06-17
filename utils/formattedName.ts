export const formatName = (fullName: string | undefined) => {
  if (!fullName) {
    return "";
  }
  const formattedName = fullName
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");

  return formattedName;
};
