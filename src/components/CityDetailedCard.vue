<template>
  <div class="main-info" :class="{'main-info--success' : cityInfo.success}">
    <div class="main-info__location">
      <h1 class="main-info__heading">{{formattedCity}}</h1>
      <div v-if="notIncluded">
        <h2 class="main-info__status">Sorry, this city is not included.</h2>
      </div>
      <h2 v-else-if="loading" class="main-info__status">Loading...</h2>
      <template v-else-if="cityInfo.success">
        <p class="main-info__country">
          {{cityInfo.region
            ? cityInfo.region + ', ' + cityInfo.country
            : cityInfo.country
          }}
        </p>
        <p>{{cityInfo.lat}}° N</p>
        <p>{{cityInfo.lon}}° E</p>
      </template>
      <h2 v-else class="main-info__status">Error!</h2>
    </div>
    <template v-if="cityInfo.success">
      <div class="main-info__temperature">
        <img
          class="main-info__weather-icon"
          :src="require(`@/assets/images/icons/${cityInfo.weather_descriptions}.svg`)"
          :alt="cityInfo.weather_descriptions"
        />
        <p class="main-info__temperature-number">
          {{cityInfo.temperature}}°C
        </p>
      </div>
      <div class="main-info__other-info">
        <p><strong class="main-info__strong">Feels Like</strong> {{cityInfo.feelslike}}°C</p>
        <p><strong class="main-info__strong">Humidity</strong> {{cityInfo.humidity}}%</p>
        <p><strong class="main-info__strong">Pressure</strong> {{cityInfo.pressure}} mbar</p>
        <p><strong class="main-info__strong">Wind</strong> {{cityInfo.wind_speed}} m/s {{cityInfo.wind_dir}}</p>
        <p><strong class="main-info__strong">UV index</strong> {{cityInfo.uv_index}}</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["formattedCity", "cityInfo", "notIncluded", "loading"]
}
</script>

<style lang="scss" scoped>
.main-info {
  padding: 26px 20px 30px;
  border-radius: 10px;
  color: transparent;
  max-width: 450px;
  font-size: 14px;
  font-weight: 300;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  transition: background-color 400ms, color 400ms;

  &__location {
    flex: 0 0 100%;

    .main-info__heading {
      font-size: 22px;
      color: #fff;
      transition: color 400ms;
    }

    .main-info__country {
      margin-block: 10px 15px;
    }
  }

  &__temperature {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;

    .main-info__weather-icon {
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

    .main-info__strong {
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

  &--success {
    color: var(--primary-clr);
    background-color: #fff;

    .main-info__heading {
      color: var(--primary-clr);
    }
  }
}
</style>