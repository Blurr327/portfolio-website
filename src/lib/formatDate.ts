export const formatDate = (dateString: string) => {
  return new Date(`${dateString}`).toLocaleDateString("fr", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};
