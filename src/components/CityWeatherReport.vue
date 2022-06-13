<template>
  <div class="detailed-card weather-report">
    <div
      v-for="day in weatherReport"
      :key="day.datetime"
      class="weather-report__day"
    >
      <h4 class="weather-report__date">{{getFormattedDate(day.datetime)}}</h4>
      <div class="weather-report__hours-list">
        <div
          v-for="(hour, index) in day.hours"
          :key="hour.datetime"  
          class="weather-report__hour"
        >
          <p class="weather-report__time">
            {{index !== 0 ? index : '00'}}h
          </p>
          <WeatherIcon className="weather-report__weather-icon" :description="hour.icon" />
          <p
            v-if="hour.temp"
            className="weather-report__temp"
          >
            {{hour.temp}}°
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue'
import getFormattedDate from '../utils/getFormattedDate'
export default {
  name: 'CityWeatherReport',
  props: ['weatherReport'],
  components: { WeatherIcon },
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

  &__hours-list {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 20px;
    // for Firefox
    scrollbar-color: #5D979B #efefef;
    scrollbar-width: thin;

    @media (min-width: 820px) {
      scrollbar-width: auto;
    }

    // For Chrome, Opera...
    &::-webkit-scrollbar {
      height: 5px;

      @media (min-width: 820px) {
        height: 10px;
      }
    }

    &::-webkit-scrollbar-track {
      background: #efefef;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #5D979B;
      border-radius: 10px;
    }

    .weather-report__hour {
      text-align: center;
    }

    .weather-report__time {
      font-size: 12px;
      font-weight: 300;

      @media (min-width: 820px) {
        font-size: 18px;
      }
    }

    .weather-report__weather-icon {
      width: 30px;
      height: 30px;
      margin: 30px auto 12px;

      @media (min-width: 820px) {
        margin-bottom: 15px;
      }
    }

    .weather-report__temp {
      font-size: 14px;

      @media (min-width: 820px) {
        font-size: 20px;
      }
    }
  }
}
</style>
