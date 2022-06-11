<template>
  <div class="detailed-card current-city">
    <div class="current-city__location">
      <h1 class="current-city__heading">{{cityInfo.city || city}}</h1>
      <p class="current-city__country">
        {{cityInfo.region}}
      </p>
      <p v-if="cityInfo.latitude">{{cityInfo.latitude}}° N</p>
      <p v-if="cityInfo.longitude">{{cityInfo.longitude}}° E</p>
    </div>
    <template v-if="cityInfo.success">
      <div class="current-city__temperature">
        <div class="current-city__temperature-wrapper">
          <WeatherIcon className="current-city__weather-icon" :description="cityInfo.icon" />
          <p
            v-if="cityInfo.temp"
            class="current-city__temperature-number"
          >
            {{cityInfo.temp}}°C
          </p>
        </div>
      </div>
      <div class="current-city__other-info">
        <p v-if="cityInfo.feelslike"><strong class="current-city__strong">Feels Like</strong> {{cityInfo.feelslike}}°C</p>
        <p v-if="cityInfo.humidity"><strong class="current-city__strong">Humidity</strong> {{cityInfo.humidity}}%</p>
        <p v-if="cityInfo.pressure"><strong class="current-city__strong">Pressure</strong> {{cityInfo.pressure}} mbar</p>
        <p v-if="cityInfo.windspeed && currentWindDir"><strong class="current-city__strong">Wind</strong> {{cityInfo.windspeed}} m/s {{currentWindDir}}</p>
        <p v-if="currentUVIndex"><strong class="current-city__strong">UV index</strong> {{currentUVIndex}}</p>
      </div>
    </template>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue'
export default {
  props: ["city", "cityInfo", "notIncluded", "loading"],
  components: { WeatherIcon },
  setup(props) {
    const getWindDir = () => {
      const { winddir } = props.cityInfo
      if (!winddir && typeof winddir !== 'number') return
      if (winddir < 11.25) {
        return 'N'
      } else if (winddir < 33.75) {
        return 'NNE'
      } else if (winddir < 56.25) {
        return 'NE'
      } else if (winddir < 78.75) {
        return 'ENE'
      } else if (winddir < 101.25) {
        return 'E'
      } else if (winddir < 123.75) {
        return 'ESE'
      } else if (winddir < 146.25) {
        return 'SE'
      } else if (winddir < 168.75) {
        return 'SSE'
      } else if (winddir < 191.25) {
        return 'S'
      } else if (winddir < 213.75) {
        return 'SSW'
      } else if (winddir < 236.25) {
        return 'SW'
      } else if (winddir < 258.75) {
        return 'WSW'
      } else if (winddir < 281.25) {
        return 'W'
      } else if (winddir < 303.75) {
        return 'WNW'
      } else if (winddir < 326.25) {
        return 'NW'
      } else if (winddir < 348.75) {
        return 'NNW'
      } else {
        return 'N'
      }
    }
    const currentWindDir = getWindDir()

    const getUVIndex = () => {
      const { uvindex } = props.cityInfo
      if (!uvindex && typeof uvindex !== 'number') return
      if (uvindex > 10) {
        return 'Extreme'
      } else if (uvindex > 7) {
        return 'Very High'
      } else if (uvindex > 5) {
        return 'High'
      } else if (uvindex > 2) {
        return 'Medium'
      } else {
        return 'Low'
      }
    }
    const currentUVIndex = getUVIndex()

    return { currentWindDir, currentUVIndex }
  }
}
</script>

<style lang="scss" scoped>
.current-city {
  max-width: 450px;
  font-size: 14px;
  font-weight: 300;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;

  @media (min-width: 820px) {
    font-size: 18px;
  }

  &__location {
    flex: 0 0 100%;

    .current-city__heading {
      font-size: 22px;

      @media (min-width: 820px) {
        font-size: 28px;
      }
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

      @media (min-width: 820px) {
        width: 75px;
        height: 75px;
      }
    }

    &-number {
      font-size: 31px;
      font-weight: 600;

      @media (min-width: 820px) {
        font-size: 48px;
      }
    }
  }

  &__other-info {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (min-width: 820px) {
      flex: unset;
    }

    .current-city__strong {
      margin-right: 10px;
      font-weight: 500;
    }
  }

  @media (min-width: 820px) {
    max-width: clamp(660px, 55vw, 862px);

    &__location {
      flex: unset;
    }
  }

  &__status {
    color: #fff;
  }
}
</style>