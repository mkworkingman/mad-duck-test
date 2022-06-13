<template>
  <div class="card-list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CityList'
}
</script>

<style lang="scss" scoped>
.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-width: 550px;
  margin: 30px auto 0;

  @media (min-width: 820px) {
    grid-template-columns: repeat(auto-fill, minmax(min(220px, 25vw), 1fr));
    gap: 20px clamp(15px, calc(4vw - 20px), 55px);
    margin-top: 50px;
    max-width: 1520px;
  }

  @media (min-width: 1200px) {
    margin-top: 150px;
  }
}
</style>
