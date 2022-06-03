<template>
  <router-link :to="'/' + name" class="card">
    <h4>{{card}}</h4>
  </router-link>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
export default {
  props: ['card'],
  setup(props) {
    const name = ref(props.card.toLowerCase().split(' ').join('_'))

    axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: '3c1bc2be7adb78435808e07c3cdb66c7',
        query: name
      }
    }).then(res => {
      console.log(res)
      console.log(res.data)
    })
    return { name }
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