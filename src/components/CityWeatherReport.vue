<template>
  <div class="weather-report">
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
export default {
  props: ['weatherReport'],
  components: { WeatherIcon },
  setup (props) {
    console.log(props.weatherReport)

    const getFormattedDate = (date) => {
      const currentDate = new Date(date)
      if (!date) return
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      return `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${String(currentDate.getDate()).padStart(2, '0')}.`
    }
    
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
  font-weight: 600;

  &__day {


    .weather-report__date {
      font-size: 18px;
    }
  }

  &__hours-list {
    display: flex;
    gap: 30px;
    overflow-x: scroll;

    .weather-report__hour {
      flex: 1 0 35px;
      text-align: center;
    }

    .weather-report__time {
      font-size: 12px;
      font-weight: 300;
    }

    .weather-report__weather-icon {
      width: 30px;
      height: 30px;
      margin: 30px auto 12px;
    }

    .weather-report__temp {
      font-size: 14px;
    }
  }
}
</style>
