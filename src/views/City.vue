<template>
  <h1>{{formattedCity}}</h1>
  <div v-if="notIncluded">
    <h2>Sorry, this city is not included.</h2>
  </div>

</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const citiesStorage = JSON.parse(localStorage.getItem('cities'))
    const city = useRoute().params.city
    const formattedCity = city.split('_').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')
    const notIncluded = ref(false)

    if (citiesStorage.includes(city)) {
      axios.get('http://api.weatherstack.com/historical', {
        params: {
          access_key: '3c1bc2be7adb78435808e07c3cdb66c7',
          query: city,
          historical_date: '2022-06-22',
          hourly: 1
        }
      }).then(res => {
        if (!res.data.success) throw Error(res.data.error.info)
        console.log(res.data)
      }).catch(err => {
        console.error(err)
      })
    } else {
      notIncluded.value = true
    }

    return { formattedCity, notIncluded }
  },
}
</script>