<template>
  <img :class="className" :src="imgUrl" :alt="description || ''">
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'WeatherIcon',
  props: ['className', 'description'],
  setup (props) {
    const imgUrl = ref(null)
    if (props.description) {
      try {
        imgUrl.value = require(`@/assets/images/icons/${props.description}.svg`)
      } catch (err) {
        imgUrl.value = ''
      }
    }
    return { imgUrl }
  },
}
</script>
