<template>
  <h2 v-if="notIncluded">Sorry, this city ({{city}}) is not included.</h2>
  <template v-else-if="loading">
    <h2>{{city}}</h2>
    <h3>Loading...</h3>
  </template>
  <template v-else-if="success">
    <CityCurrent
      :city="city"
      :cityInfo="cityInfo"
    />
    <CityWeatherReport
      :weatherReport="weatherReport"
    />
  </template>
  <h2 v-else>Error!</h2>
</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { reactive, ref } from '@vue/reactivity'
import CityCurrent from '../components/CityCurrent.vue'
import CityWeatherReport from '../components/CityWeatherReport.vue'
export default {
  setup() {
    const citiesArray = ref([])
    try {
      const parcedStorage = JSON.parse(localStorage.getItem('cities'))
      if (Array.isArray(parcedStorage)) {
        citiesArray.value = parcedStorage
      } else {
        throw Error
      }
    } catch {
      console.error('Wrong Storage')
    }
    const city = useRoute().params.city
    const cityInfo = reactive({
      city: null,
      region: null,
      latitude: null,
      longitude: null,
      icon: null,
      temp: null,
      feelslike: null,
      humidity: null,
      pressure: null,
      windspeed: null,
      winddir: null,
      uvindex: null
    })
    const weatherReport = ref(null)

    const notIncluded = ref(false)
    const loading = ref(true)
    const success = ref(null)

    if (citiesArray.value.includes(city)) {
      axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city, {
        params: {
          unitGroup: 'metric',
          key: '7F44VQFF6LAFLRSSLKDYCD3GA',
          contentType: 'json'
        }
      })
        .then(res => {
          success.value = true
          cityInfo.success = true
          cityInfo.city = res.data.resolvedAddress.split(',')[0]
          cityInfo.region = res.data.resolvedAddress.split(',').splice(1).join(', ')
          cityInfo.latitude = res.data.latitude
          cityInfo.longitude = res.data.longitude
          cityInfo.icon = res.data.currentConditions.icon
          cityInfo.temp = res.data.currentConditions.temp
          cityInfo.feelslike = res.data.currentConditions.feelslike
          cityInfo.humidity = res.data.currentConditions.humidity
          cityInfo.pressure = res.data.currentConditions.pressure
          cityInfo.windspeed = res.data.currentConditions.windspeed
          cityInfo.winddir = res.data.currentConditions.winddir
          cityInfo.uvindex = res.data.currentConditions.uvindex
          weatherReport.value = res.data.days
        })
        .catch(err => console.error(err))
        .finally(() => {
          loading.value = false
        })
    } else {
      notIncluded.value = true
    }

    return { city, notIncluded, cityInfo, loading, success, weatherReport }
  },
  components: { CityCurrent, CityWeatherReport }
}
</script>
