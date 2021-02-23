<template>
  <input :class="$style.input" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'CartInput',
}
</script>

<style module lang="scss">
.input {
  @include app-input;
  @include app-text;
  padding: 14px 14px 15px;
  width: 100%;

  &::placeholder {
    @include app-text(var(--grey-light));
  }
}
</style>
