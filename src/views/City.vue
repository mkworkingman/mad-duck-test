<template>
  <h1>{{formattedCity}}</h1>
  <div v-if="notIncluded">
    <h2>Sorry, this city is not included.</h2>
  </div>
  <div v-else-if="loading">
    <h2>Loading...</h2>
  </div>
  <div v-else>
    <h2>Loaded</h2>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { reactive, ref } from '@vue/reactivity'
export default {
  setup() {
    const citiesStorage = JSON.parse(localStorage.getItem('cities'))
    const city = useRoute().params.city
    const formattedCity = city.split('_').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')
    const cityInfo = reactive({
      city: null,
      region: null,
      country: null,
      lat: null,
      lon: null,
      weather_descriptions: null,
      temperature: null,
      feelslike: null,
      humidity: null,
      pressure: null,
      wind_speed: null,
      uv_index: null
    })
    const notIncluded = ref(false)
    const loading = ref(true)

    if (citiesStorage.includes(city)) {
      axios.get('http://api.weatherstack.com/current', {
        params: {
          access_key: 'f2e4e44f4e397bc7f1876ce7c0162d36',
          query: city
        }
      }).then(res => {
        if (res.data.success === false) throw Error(res.data.error.info)
        console.log(res.data)
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        loading.value = false
      })
    } else {
      notIncluded.value = true
    }

    return { formattedCity, notIncluded, cityInfo, loading }
  },
}
</script>