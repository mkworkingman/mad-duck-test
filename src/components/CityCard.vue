<template>
  <router-link :to="'/' + card" class="card">
    <h4 class="card__heading">{{name}}</h4>
    <div v-if="loading" class="card__loading">Loading...</div>
    <div v-else-if="cardInfo.country && cardInfo.temperature" class="card__info">
      <p class="card__country">
        {{cardInfo.country}}
      </p>
      <p class="card__temperature">
        {{cardInfo.temperature}}°C
      </p>
      <button class="card__button">View City</button>
    </div>
    <div v-else>
      Error!
    </div>
  </router-link>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
// import axios from 'axios'
export default {
  props: ['card'],
  setup(props) {
    const name = props.card.split('_').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')
    const loading = ref(true)
    const cardInfo = reactive({
      city: null,
      country: null,
      temperature: null
    })

    // axios.get('http://api.weatherstack.com/current', {
    //   params: {
    //     access_key: '2be358ec4c6cf2b17791a919af94d900',
    //     query: props.card
    //   }
    // }).then(res => {
    //   if (res.data.success === false) throw Error(res.data.error.info)
    //   cardInfo.city = res.data.location.name
    //   cardInfo.country = res.data.location.country
    //   cardInfo.temperature = res.data.current.temperature
    // }).catch(err => {
    //   console.error(err)
    // }).finally(() => {
    //   loading.value = false
    // })
    return { name, cardInfo, loading }
  },
}
</script>

<style lang="scss" scoped>
.card {
  color: var(--primary-clr);
  background: #fff;
  border-radius: 10px;
  padding: 20px 15px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  animation: cardAppear 400ms;

  &__heading {
    @media (min-width: 820px) {
      font-size: 24px;
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__country {
    font-size: 12px;
    color: #707070;
    margin-block: 5px 10px;
  }

  &__temperature {
    margin-block: auto 20px;
    font-size: 38px;
    font-weight: 600;
  }

  &__button {
    font-size: 14px;
    background-color: var(--primary-clr);
    color: #fff;
    height: 26px;
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
  }
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>