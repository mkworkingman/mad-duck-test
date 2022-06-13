import axios from 'axios'

export default async function getCity(city) {
  const { data } = await axios.get('https://api.api-ninjas.com/v1/city', {
    headers: {
      'X-Api-Key': 'GHPKTCFJgl7nrLffyKW2dQ==PWKxCmPRfoQFsqdJ'
    },
    params: {
      name: city
    }
  })
  return data
}
