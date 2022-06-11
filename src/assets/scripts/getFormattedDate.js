export default function getFormattedDate(date) {
  const currentDate = new Date(date)
  if (!date) return
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${String(currentDate.getDate()).padStart(2, '0')}.`
}
