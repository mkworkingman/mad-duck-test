<template>
  <div class="current-city">
    <div class="current-city__location">
      <h1 class="current-city__heading">{{cityInfo.city || city}}</h1>
      <p class="current-city__country">
        {{cityInfo.region}}
      </p>
      <p>{{cityInfo.latitude}}° N</p>
      <p>{{cityInfo.longitude}}° E</p>
    </div>
    <template v-if="cityInfo.success">
      <div class="current-city__temperature">
        <div class="current-city__temperature-wrapper">
          <WeatherIcon :description="cityInfo.icon" />
          <p class="current-city__temperature-number">
            {{cityInfo.temp}}°C
          </p>
        </div>
      </div>
      <div class="current-city__other-info">
        <p><strong class="current-city__strong">Feels Like</strong> {{cityInfo.feelslike}}°C</p>
        <p><strong class="current-city__strong">Humidity</strong> {{cityInfo.humidity}}%</p>
        <p><strong class="current-city__strong">Pressure</strong> {{cityInfo.pressure}} mbar</p>
        <p><strong class="current-city__strong">Wind</strong> {{cityInfo.windspeed}} m/s {{getWindDir(cityInfo.winddir)}}</p>
        <p><strong class="current-city__strong">UV index</strong> {{uvIndex}} {{getUVIndex(cityInfo.uvindex)}}</p>
      </div>
    </template>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue'
import getWindDir from '../assets/scripts/getWindDir'
import getUVIndex from '../assets/scripts/getUVIndex'
export default {
  props: ["city", "cityInfo", "notIncluded", "loading"],
  components: { WeatherIcon },
  setup() {
    return { getWindDir, getUVIndex }
  }
}
</script>

<style lang="scss" scoped>
.current-city {
  padding: 26px 20px 30px;
  border-radius: 10px;
  color: var(--primary-clr);
  background-color: #fff;
  max-width: 450px;
  font-size: 14px;
  font-weight: 300;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;

  &__location {
    flex: 0 0 100%;

    .current-city__heading {
      font-size: 22px;
    }

    .current-city__country {
      margin-block: 10px 15px;
    }
  }

  &__temperature {
    flex: 1;

    &-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      width: fit-content;

      @media (min-width: 820px) {
        width: auto;
      }
    }

    .current-city__weather-icon {
      width: 50px;
      height: 50px;
    }

    &-number {
      font-size: 31px;
      font-weight: 600;
    }
  }

  &__other-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .current-city__strong {
      margin-right: 10px;
    }
  }

  @media (min-width: 820px) {
    max-width: clamp(660px, 55vw, 862px);

    &__location {
      flex: 1;
    }
  }

  &__status {
    color: #fff;
  }
}
</style>