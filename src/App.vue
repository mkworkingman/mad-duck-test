<template>
<div class="layout">
  <HeaderLayout />
  <main class="layout__main">
    content
  </main>
  <FooterLayout />
</div>
</template>

<script>
import HeaderLayout from './components/layout/HeaderLayout.vue';
import FooterLayout from './components/layout/FooterLayout.vue';
export default {
  name: "App",
  components: { HeaderLayout, FooterLayout }
}
</script>