<template>
  <div class="main">
    <h1 class="main__heading">Add Cities</h1>
    <p class="main__description">Add 5 cities whose temperature you want to track.</p>
    <AddCity v-model="cityName" @add-city="submitCity" />
  </div>
  <div class="card-list">
    <CityCard v-for="card in citiesArray" :key="card" :card="card" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import CityCard from '../components/CityCard.vue'
import AddCity from '../components/AddCity.vue'
export default {
  name: "Home",
  setup() {
    const citiesStorage = ref([])
    try {
      citiesStorage.value = JSON.parse(localStorage.getItem('cities'))
    } catch {
      console.error('Wrong Storage')
    }
    const cityName = ref('')
    const citiesArray = ref([])

    const submitCity = () => {
      const formattedCity = cityName.value.trim().toLowerCase().replace(/ /g,"_")

      if (formattedCity && !citiesArray.value.includes(formattedCity)) {
        citiesArray.value.push(formattedCity)
        cityName.value = ''
        localStorage.setItem('cities', JSON.stringify(citiesArray.value))
      }
    };

    if (Array.isArray(citiesStorage.value)) {
      citiesArray.value = [...citiesStorage.value]
    }
    
    return { cityName, citiesArray, submitCity }
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