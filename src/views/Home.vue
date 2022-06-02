<template>
  <div class="main">
    <h1 class="main__heading">Add Cities</h1>
    <p class="main__description">Add 5 cities whose temperature you want to track.</p>
    <form @submit.prevent="submitCity" class="enter-city">
      <input class="enter-city__btn enter-city__btn--plus" type="submit" value="+">
      <input class="enter-city__input" type="text" placeholder="Add a city…">
      <input class="enter-city__btn enter-city__btn--add" type="submit" value="Add">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  setup() {
    const submitCity = () => {
      console.log('test')
    }

    return { submitCity }
  },
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1000px;
  width: 100%;
  margin-inline: auto;
  color: #fff;

  &__heading {
    font-size: 20px;
    margin-bottom: 10px;
  }

  &__description {
    font-size: 14px;
  }

  .enter-city {
    margin-top: 30px;
    position: relative;

    &__input {
      width: 100%;
      font-size: 14px;
      line-height: 20px;
      padding: 4px 60px 4px 42px;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: border-color 250ms, box-shadow 250ms;
      outline: 0;

      &:hover {
        border-color: #5abece;
      }

      &:focus {
        border-color: #04353C;
        box-shadow: 0 0 0 0.2rem rgb(4 53 60 / 25%);
      }
    }

    &__btn {
      position: absolute;
      color: #fff;
      background-color: #04353C;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      &--plus {
        position: absolute;
        left: 4px;
        height: 22px;
        width: 22px;
        border-radius: 50%;
      }

      &--add {
        position: absolute;
        right: 2px;
        border-radius: 10px;
        font-size: 14px;
        line-height: 26px;
        padding-inline: 12px;
      }
    }
  }
}
</style>