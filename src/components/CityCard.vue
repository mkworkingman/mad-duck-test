<template>
  <router-link :to="'/' + card" class="card">
    <h4>{{card}}</h4>
  </router-link>
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
  animation: cardAppear 400ms;
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>