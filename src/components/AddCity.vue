<template>
  <form @submit.prevent="$emit('add-city')" class="add-city">
    <input
      class="add-city__btn add-city__btn--plus"
      type="submit"
      value="+"
      :disabled="loading"
    >
    <input
      class="add-city__input"
      placeholder="Add a city…"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="loading"
    >
    <input
      class="add-city__btn add-city__btn--add"
      type="submit"
      value="Add"
      :disabled="loading"
    >
  </form>
</template>

<script>
export default {
  name: 'AddCity',
  props: ['modelValue', 'loading'],
}
</script>

<style lang="scss" scoped>
.add-city {
  margin-top: 30px;
  position: relative;

  @media (min-width: 820px) {
    margin-top: 60px;
  }

  &__input {
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 60px 4px 42px;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: border-color 250ms, box-shadow 250ms;
    outline: 0;

    @media (min-width: 820px) {
      font-size: 20px;
      padding: 19px 130px 19px 80px;
    }

    &:hover,
    &:focus {
      border-color: var(--primary-clr);
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem rgb(4 53 60 / 25%);
    }

    &:disabled {
      cursor: default;
    }
  }

  &__btn {
    position: absolute;
    color: #fff;
    background-color: var(--primary-clr);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:disabled {
      filter: grayscale(60%);
      color: #ccc;
      cursor: default;
    }
  }

  &__btn--plus {
    position: absolute;
    left: 4px;
    height: 22px;
    width: 22px;
    border-radius: 50%;

    @media (min-width: 820px) {
      height: 40px;
      width: 40px;
      font-size: 28px;
      left: 20px;
    }
  }

  &__btn--add {
    position: absolute;
    right: 2px;
    border-radius: 10px;
    font-size: 14px;
    height: 26px;
    padding-inline: 12px;

    @media (min-width: 820px) {
      right: 8px;
      font-size: 20px;
      height: 54px;
      padding-inline: 36px;
    }
  }
}
</style>
