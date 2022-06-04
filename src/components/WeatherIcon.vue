<template>
  <img :src="imgUrl" :alt="description">
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

</style>