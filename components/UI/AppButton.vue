<template>
  <button :class="$style.cartButton" v-bind="$attrs" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CartButton',
}
</script>

<style module lang="scss">
.cartButton {
  width: 100%;
  display: block;
  background: var(--black);
  border-radius: 8px;
  padding: 14px 0 15px;
  color: var(--white);
  font-size: 16px;
  letter-spacing: 0.3px;
  position: relative;

  &:hover {
    background-color: var(--grey);
    cursor: pointer;
  }

  &:active {
    background-color: var(--black);
    cursor: pointer;
  }
}
</style>
