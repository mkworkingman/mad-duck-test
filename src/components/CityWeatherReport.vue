<template>
  <div class="weather-report">
    <div
      v-for="day in weatherReport"
      :key="day.datetime"
      class="weather-report__day"
    >
      {{day.datetime}}
      {{getFormattedDate(day.datetime)}}
    </div>
  </div>
</template>

<script>
import getFormattedDate from '../assets/scripts/getFormattedDate'
export default {
  props: ['weatherReport'],
  setup (props) {
    console.log(props.weatherReport)

    return { getFormattedDate }
  }
}
</script>

<style lang="scss" scoped>
.weather-report {
  margin-top: 30px;
  border-radius: 10px;
  color: var(--primary-clr);
  background-color: #fff;
  font-size: 14px;
  font-weight: 300;
}
</style>
