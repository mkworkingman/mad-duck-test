import axios from 'axios'

export default async function getWeather(city) {
  const { data } = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city, {
    params: {
      unitGroup: 'metric',
      key: 'TTLD6FBNVKTDUDB4ZNPG52V9R',
      contentType: 'json'
    }
  })
  return data
}
