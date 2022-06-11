export default function getWindDir(winddir) {
  if (!winddir && typeof winddir !== 'number') return
  if (winddir < 11.25) {
    return 'N'
  } else if (winddir < 33.75) {
    return 'NNE'
  } else if (winddir < 56.25) {
    return 'NE'
  } else if (winddir < 78.75) {
    return 'ENE'
  } else if (winddir < 101.25) {
    return 'E'
  } else if (winddir < 123.75) {
    return 'ESE'
  } else if (winddir < 146.25) {
    return 'SE'
  } else if (winddir < 168.75) {
    return 'SSE'
  } else if (winddir < 191.25) {
    return 'S'
  } else if (winddir < 213.75) {
    return 'SSW'
  } else if (winddir < 236.25) {
    return 'SW'
  } else if (winddir < 258.75) {
    return 'WSW'
  } else if (winddir < 281.25) {
    return 'W'
  } else if (winddir < 303.75) {
    return 'WNW'
  } else if (winddir < 326.25) {
    return 'NW'
  } else if (winddir < 348.75) {
    return 'NNW'
  } else {
    return 'N'
  }
}
