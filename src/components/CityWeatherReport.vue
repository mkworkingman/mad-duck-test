<template>
  <div>

  </div>
</template>

<script>
export default {
  props: ['weatherReport'],
  setup (props) {
    console.log(props.weatherReport.length)
    console.log(props.weatherReport[0])

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>