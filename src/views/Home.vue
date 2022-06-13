<template>
  <div class="main">
    <h1 class="main__heading">Add Cities</h1>
    <p v-if="citiesArray.length < 5" class="main__description">Add 5 cities whose temperature you want to track.</p>
    <AddCity v-model="cityName" @add-city="submitCity" :loading="loading" />
  </div>
  <CityList>
    <CityCard v-for="card in citiesArray" :key="card" :card="card" />
  </CityList>
</template>

<script>
import { ref } from '@vue/reactivity'
import CityCard from '../components/CityCard.vue'
import AddCity from '../components/AddCity.vue'
import CityList from '../components/CityList.vue'
import getCity from '../utils/http/getCity'
export default {
  name: 'Home',
  setup() {
    const cityName = ref('')
    const citiesArray = ref([])
    const loading = ref(false)
    try {
      if (localStorage.getItem('cities')) {
        const parcedStorage = JSON.parse(localStorage.getItem('cities'))
        if (Array.isArray(parcedStorage)) {
          citiesArray.value = parcedStorage
        }
      }
    } catch {
      console.error('Wrong Storage')
    }

    const submitCity = () => {
      const cityNameTrim = cityName.value.trim()

      if (cityNameTrim && !loading.value) {
        loading.value = true
        getCity(cityNameTrim)
          .then(res => {
            if (res.data[0]) {
              const cityNameFromAPI = res.data[0].name
              if (!citiesArray.value.includes(cityNameFromAPI)) {
                citiesArray.value.push(cityNameFromAPI)
                cityName.value = ''
                localStorage.setItem('cities', JSON.stringify(citiesArray.value))
              }
            }
          })
          .catch(err => console.error(err))
          .finally(() => {
            loading.value = false
          })
      }
    };
    
    return { cityName, citiesArray, loading, submitCity }
  },
  components: { CityCard, AddCity, CityList }
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1000px;
  width: 100%;
  margin-inline: auto;

  &__heading {
    font-size: 20px;
    margin-bottom: 10px;

    @media (min-width: 820px) {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }

  &__description {
    font-size: 14px;
    font-weight: 300;

    @media (min-width: 820px) {
      font-size: 24px;
    }
  }
}
</style>
