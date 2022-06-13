<template>
  <div class="weather-report-hour">
    <p class="weather-report-hour__time">
      {{index !== 0 ? index : '00'}}h
    </p>
    <WeatherIcon className="weather-report-hour__icon" :description="hour.icon" />
    <p
      v-if="hour.temp"
      className="weather-report-hour__temp"
    >
      {{hour.temp}}°
    </p>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue'
export default {
  name: 'WeatherReportHour',
    props: ['hour', 'index'],
  components: { WeatherIcon }
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

  &__icon {
    width: 30px;
    height: 30px;
    margin: 30px auto 12px;

    @media (min-width: 820px) {
      margin-bottom: 15px;
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
