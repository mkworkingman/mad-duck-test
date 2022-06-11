<template>
  <div class="weather-report">
    <div
      v-for="day in weatherReport"
      :key="day.datetime"
      class="weather-report__day"
    >
      {{getFormattedDate(day.datetime)}}
      <div class="weather-report__hour">
        <div
          v-for="hour in day.hours"
          :key="hour.datetime"  
        >
          {{hour.datetime}}
          <WeatherIcon :description="hour.icon" />
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
  font-size: 14px;
  font-weight: 300;

  &__day {

  }

  &__hour {
    display: flex;
    gap: 30px;
    overflow-x: scroll;
  }
}
</style>
