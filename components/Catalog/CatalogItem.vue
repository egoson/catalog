<template>
  <nuxt-link
    v-bind="$attrs.class"
    :class="$style.appLink"
    :to="'/' + catalogItem.id"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  name: 'CatalogItem',
  props: {
    catalogItem: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style module lang="scss">
.appLink {
  @include app-link;
  display: block;
}

:global(.nuxt-link-active:hover),
:global(.nuxt-link-active) {
  text-decoration: underline;
  color: var(--black);
}
</style>
