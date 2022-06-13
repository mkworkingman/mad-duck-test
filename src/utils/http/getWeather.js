import axios from 'axios'

export default async function getWeather(city) {
  const { data } = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city, {
    params: {
      unitGroup: 'metric',
      key: '7F44VQFF6LAFLRSSLKDYCD3GA',
      contentType: 'json'
    }
  })
  return data
}
