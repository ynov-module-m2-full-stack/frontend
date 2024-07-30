export function formatDateToSql(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

  return `${year}-${month}-${day}`;
}
export function parseDateObjectToDateSql(dateObject) {
  // Ensure we're working with a Date object
  if (!(dateObject instanceof Date)) {
    throw new TypeError('Input must be a Date object');
  }

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, '0');
  const hours = String(dateObject.getHours()).padStart(2,  
 '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  

}

export function extractTimeFromSqlDate(sqlDate) {
  if (sqlDate instanceof Date) {
    return `${sqlDate.getHours()}:${sqlDate.getMinutes()}`;
  }
  // Assuming SQL date format is YYYY-MM-DD HH:MM:SS
  const parts = sqlDate.split(' ');
  return parts[1]; // Extract the time part
}