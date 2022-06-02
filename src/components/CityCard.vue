<template>
  <div class="card">
    <h4>{{card}}</h4>
  </div>
</template>

<script>
export default {
  props: ['card'],
  setup() {
    
  },
}
</script>

<style lang="scss" scoped>
.card {
  color: #04353C;
  background: #fff;
  border-radius: 10px;
  padding: 20px 15px 30px;
  text-align: center;
}
</style>