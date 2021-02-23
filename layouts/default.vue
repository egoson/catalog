<template>
  <div>
    <TheHeader />
    <TheCart />
    <div :class="$style.container">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheCart from '@/components/Cart/TheCart'

export default {
  components: {
    TheHeader,
    TheCart,
  },
}
</script>

<style module lang="scss">
body {
  margin: 0;
  font-family: 'PT Sans', 'Sans-serif';
  padding-top: 66px;
}

.container {
  padding: var(--container-padding-mob);

  @media (min-width: 781px) {
    padding: var(--container-padding-desc);
  }
}
</style>
