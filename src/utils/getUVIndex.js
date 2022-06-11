export default function getUVIndex(uvindex) {
  if (!uvindex && typeof uvindex !== 'number') return
  if (uvindex > 10) {
    return 'Extreme'
  } else if (uvindex > 7) {
    return 'Very High'
  } else if (uvindex > 5) {
    return 'High'
  } else if (uvindex > 2) {
    return 'Medium'
  } else {
    return 'Low'
  }
}
