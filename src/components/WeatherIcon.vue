<template>
  <img class="weather-icon" :src="imgUrl" :alt="description">
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: ['description'],
  setup (props) {
    const imgUrl = ref('')
    try {
      imgUrl.value = require(`@/assets/images/icons/${props.description}.svg`)
    } catch (err) {
      console.error(err)
    }
    return { imgUrl }
  },
}
</script>

<style lang="scss" scoped>
.weather-icon {
  width: 50px;
  height: 50px;

  @media (min-width: 820px) {
    width: 75px;
    height: 75px;
  }
}
</style>