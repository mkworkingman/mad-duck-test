<template>
  <h1>{{ formattedCity || $route.params.city }}</h1>
</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
export default {
  setup() {
    const city = useRoute().params.city
    const formattedCity = city.split('_').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')

    axios.get('http://api.weatherstack.com/historical', {
      params: {
        access_key: '3c1bc2be7adb78435808e07c3cdb66c7',
        query: city,
        historical_date: '2022-06-22',
        hourly: 1
      }
    }).then(res => {
      console.log(res.data.location.name)
    }).catch(err => {
      console.error(err)
    })
    return { formattedCity }
  },
}
</script>