<template>
  <router-link
    :to="valid ? '/' + card : ''"
    class="card"
    :class="{'card--not-valid': !valid}"
  >
    <h4 class="card__heading">{{cardInfo.city || card}}</h4>
    <div v-if="loading" class="card__loading">Loading...</div>
    <template v-else-if="valid">
      <p class="card__country">
        {{cardInfo.country}}
      </p>
      <p class="card__temperature">
        {{cardInfo.temperature}}°C
      </p>
      <button class="card__button">View City</button>
    </template>
    <div v-else class="card__error">
      Error!
    </div>
  </router-link>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios'
import { computed } from '@vue/runtime-core'
export default {
  props: ['card'],
  setup(props) {
    const loading = ref(true)
    const cardInfo = reactive({
      city: null,
      country: null,
      temperature: null
    })
    const valid = computed(() => {
      return cardInfo.country && cardInfo.temperature
    }) 

    axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + props.card, {
      params: {
        unitGroup: 'metric',
        key: '7F44VQFF6LAFLRSSLKDYCD3GA',
        contentType: 'json'
      }
    })
      .then(res => {
        console.log(res)
        const resolvedAddressSplitted = res.data.resolvedAddress.split(', ')
        cardInfo.city = resolvedAddressSplitted[0]
        cardInfo.country = resolvedAddressSplitted[resolvedAddressSplitted.length - 1]
        cardInfo.temperature = res.data.currentConditions.temp
      })
      .catch(err => console.error(err))
      .finally(() => {
        loading.value = false
      })
    return { cardInfo, loading, valid }
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

  &--not-valid {
    cursor: default;
  }

  &__heading {
    font-size: 16px;
    word-break: break-word;
  
    @media (min-width: 820px) {
      font-size: 24px;
    }
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

  &__error {
    font-size: 24px;
    color: #b81a1a;
    margin-block: auto;
  }
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>