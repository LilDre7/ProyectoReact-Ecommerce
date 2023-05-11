export const formatDateDDMMYYYY  = (date) => {
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return newDate.toLocaleDateString("es-ES", options);
}