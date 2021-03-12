<template>
  <ul :class="$style.catalogList">
    <li v-for="catalogItem in catalogItems" :key="catalogItem.id">
      <CatalogItem :class="$style.catalogItem" :catalogItem="catalogItem">
        {{ catalogItem.title }}
      </CatalogItem>
    </li>
  </ul>
</template>

<script>
import CatalogItem from '@/components/Catalog/CatalogItem'
export default {
  name: 'CatalogList',
  components: {CatalogItem},
  props: {
    catalogItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style module lang="scss">
.catalogList {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 16px;
  @include app-block;
  flex-shrink: 0;

  @media (min-width: 781px) {
    display: block;
    border-radius: unset;
    padding: 4px;
    background-color: transparent;
    box-shadow: unset;
  }
}

.catalogItem {
  padding: 8px 4px;
  margin-right: 16px;
}
</style>
