<template>
  <div class="main-info" :class="{'main-info--success' : cityInfo.success}">
    <div class="main-info__location">
      <h1 class="main-info__heading">{{formattedCity}}</h1>
      <div v-if="notIncluded">
        <h2 class="main-info__status">Sorry, this city is not included.</h2>
      </div>
      <h2 v-else-if="loading" class="main-info__status">Loading...</h2>
      <template v-else-if="cityInfo.success">
        <p>
          {{cityInfo.region
            ? cityInfo.region + ', ' + cityInfo.country
            : cityInfo.country
          }}
        </p>
        <p>{{cityInfo.lat}}° N</p>
        <p>{{cityInfo.lon}}° E</p>
      </template>
      <h2 v-else class="main-info__status">Error!</h2>
    </div>
    <template v-if="cityInfo.success">
      <div class="main-info__temperature">
        <p>{{cityInfo.weather_descriptions}}</p>
        <p>{{cityInfo.temperature}}°C</p>
      </div>
      <div class="main-info__other-info">
        <p><strong>Feels Like</strong> {{cityInfo.feelslike}}°C</p>
        <p><strong>Humidity</strong> {{cityInfo.humidity}}%</p>
        <p><strong>Pressure</strong> {{cityInfo.pressure}} mbar</p>
        <p><strong>Wind</strong> {{cityInfo.wind_speed}} m/s {{cityInfo.wind_dir}}</p>
        <p><strong>UV index</strong> {{cityInfo.uv_index}}</p>
      </div>
    </template>
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
      success: false,
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
      wind_dir: null,
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
        cityInfo.success = true
        cityInfo.city = res.data.location.name
        cityInfo.region = res.data.location.region
        cityInfo.country = res.data.location.country
        cityInfo.lat = res.data.location.lat
        cityInfo.lon = res.data.location.lon
        cityInfo.weather_descriptions = res.data.current.weather_descriptions[0]
        cityInfo.temperature = res.data.current.temperature
        cityInfo.feelslike = res.data.current.feelslike
        cityInfo.humidity = res.data.current.humidity
        cityInfo.pressure = res.data.current.pressure
        cityInfo.wind_speed = res.data.current.wind_speed
        cityInfo.wind_dir = res.data.current.wind_dir

        const { uv_index } = res.data.current
        if (uv_index > 10) {
          cityInfo.uv_index = 'Extreme'
        } else if (uv_index > 7) {
          cityInfo.uv_index = 'Very High'
        } else if (uv_index > 5) {
          cityInfo.uv_index = 'High'
        } else if (uv_index > 2) {
          cityInfo.uv_index = 'Medium'
        } else {
          cityInfo.uv_index = 'Low'
        }
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

<style lang="scss" scoped>
.main-info {
  padding: 26px 20px 30px;
  border-radius: 10px;
  color: transparent;
  transition: background-color 400ms, color 400ms;

  &__status {
    color: #fff;
  }

  &--success {
    color: #04353C;
    background-color: #fff;

    .main-info__heading {
      color: #04353C;
    }
  }

  &__heading {
    font-size: 22px;
    color: #fff;
    transition: color 400ms;
  }
}
</style>