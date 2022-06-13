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
import { reactive, ref } from '@vue/reactivity'
import CityCurrent from '../components/CityCurrent.vue'
import CityWeatherReport from '../components/CityWeatherReport.vue'
import getWeather from '../utils/http/getWeather'
export default {
  name: 'City',
  setup() {
    const citiesArray = ref([])
    try {
      const parcedStorage = JSON.parse(localStorage.getItem('cities'))
      if (Array.isArray(parcedStorage)) {
        citiesArray.value = parcedStorage
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
      getWeather(city)
        .then(data => {
          success.value = true
          cityInfo.city = data.resolvedAddress.split(',')[0]
          cityInfo.region = data.resolvedAddress.split(',').splice(1).join(', ')
          cityInfo.latitude = data.latitude
          cityInfo.longitude = data.longitude
          cityInfo.icon = data.currentConditions.icon
          cityInfo.temp = data.currentConditions.temp
          cityInfo.feelslike = data.currentConditions.feelslike
          cityInfo.humidity = data.currentConditions.humidity
          cityInfo.pressure = data.currentConditions.pressure
          cityInfo.windspeed = data.currentConditions.windspeed
          cityInfo.winddir = data.currentConditions.winddir
          cityInfo.uvindex = data.currentConditions.uvindex
          weatherReport.value = (data.days.map(day => ({
            datetime: day.datetime,
            hours: day.hours.map(hour => ({
              datetime: hour.datetime,
              temp: hour.temp,
              icon: hour.icon
            }))
          })))
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

<style lang="scss" scoped>
.detailed-card {
  border-radius: 10px;
  color: var(--primary-clr);
  background-color: #fff;
  padding: 26px 20px 30px;

  @media (min-width: 820px) {
    padding: 40px;
  }
}
</style>