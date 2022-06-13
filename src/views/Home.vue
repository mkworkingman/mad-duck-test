<template>
  <div class="main">
    <h1 class="main__heading">Add Cities</h1>
    <p v-if="citiesArray.length < 5" class="main__description">Add 5 cities whose temperature you want to track.</p>
    <AddCity v-model="cityName" @add-city="submitCity" :loading="loading" />
  </div>
  <div class="card-list">
    <CityCard v-for="card in citiesArray" :key="card" :card="card" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import CityCard from '../components/CityCard.vue'
import AddCity from '../components/AddCity.vue'
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
        } else {
          throw Error
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
  components: { CityCard, AddCity }
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

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 30px;
  max-width: 550px;
  margin: 30px auto 0;

  @media (min-width: 820px) {
    grid-template-columns: repeat(auto-fill, minmax(min(220px, 25vw), 1fr));
    gap: 20px clamp(15px, calc(4vw - 20px), 55px);
    margin-top: 50px;
    max-width: initial;
  }

  @media (min-width: 1200px) {
    margin-top: 150px;
  }
}
</style>