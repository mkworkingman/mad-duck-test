<template>
  <div class="weather-report-list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'WeatherReportList'
}
</script>

<style lang="scss" scoped>
.weather-report-list {
  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
  // For Firefox
  scrollbar-color: #5D979B #efefef;
  scrollbar-width: thin;

  @media (min-width: 820px) {
    scrollbar-width: auto;
  }

  // For Chrome, Opera, Safari...
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
}
</style>
