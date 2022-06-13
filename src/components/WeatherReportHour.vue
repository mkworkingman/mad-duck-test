<template>
  <div class="weather-report-hour">
    <p class="weather-report-hour__time">
      {{index !== 0 ? index : '00'}}h
    </p>
    <slot />
    <p
      v-if="hour.temp"
      className="weather-report-hour__temp"
    >
      {{hour.temp}}°
    </p>
  </div>
</template>

<script>
export default {
  name: 'WeatherReportHour',
  props: ['hour', 'index']
}
</script>

<style lang="scss" scoped>
.weather-report-hour {
  text-align: center;
  min-width: 65px;

  &__time {
    font-size: 12px;
    font-weight: 300;

    @media (min-width: 820px) {
      font-size: 18px;
    }
  }

  &__temp {
    font-size: 14px;

    @media (min-width: 820px) {
      font-size: 20px;
    }
  }
}
</style>
