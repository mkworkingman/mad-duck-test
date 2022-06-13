<template>
  <div class="detailed-card weather-report">
    <div
      v-for="day in weatherReport"
      :key="day.datetime"
      class="weather-report__day"
    >
      <h4 class="weather-report__date">{{getFormattedDate(day.datetime)}}</h4>
      <WeatherReportList>
        <WeatherReportHour
          v-for="(hour, index) in day.hours"
          :key="hour.datetime"
          :hour="hour"
          :index="index"
        />
      </WeatherReportList>
    </div>
  </div>
</template>

<script>
import getFormattedDate from '../utils/getFormattedDate'
import WeatherReportList from './WeatherReportList.vue'
import WeatherReportHour from './WeatherReportHour.vue'
export default {
  name: 'CityWeatherReport',
  props: ['weatherReport'],
  components: { WeatherReportList, WeatherReportHour },
  setup () {
    return { getFormattedDate }
  }
}
</script>

<style lang="scss" scoped>
.weather-report {
  margin-block: 30px 20px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (min-width: 820px) {
    margin-block: 50px 30px;
    gap: 50px;
  }

  @media (min-width: 1440px) {
    margin-block: 30px 60px;
    gap: 60px;
  }

  .weather-report__date {
    font-size: 18px;
    margin-bottom: 20px;

    @media (min-width: 820px) {
      font-size: 22px;
    }
  }
}
</style>
