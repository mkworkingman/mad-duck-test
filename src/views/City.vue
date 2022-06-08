<template>
  <CityDetailed
    :city="city"
    :cityInfo="cityInfo"
    :notIncluded="notIncluded"
    :loading="loading"
  />
</template>

<script>
import { useRoute } from 'vue-router'
import axios from 'axios'
import { reactive, ref } from '@vue/reactivity'
import CityDetailed from '../components/CityDetailed.vue'
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
      success: false,
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
    const notIncluded = ref(false)
    const loading = ref(true)

    if (citiesArray.value.includes(city)) {
      axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city, {
        params: {
          unitGroup: 'metric',
          key: '7F44VQFF6LAFLRSSLKDYCD3GA',
          contentType: 'json'
        }
      })
        .then(res => {
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
        })
        .catch(err => console.error(err))
        .finally(() => {
          loading.value = false
        })
    } else {
      notIncluded.value = true
    }

    return { city, notIncluded, cityInfo, loading }
  },
  components: { CityDetailed }
}
</script>
