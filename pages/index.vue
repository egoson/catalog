<template>
  <div style="overflow: hidden">
    <div :class="$style.catalogHeader">
      <p :class="$style.title">Каталог</p>
      <ProductSort />
    </div>
    <section :class="$style.listWrap">
      <CatalogList :catalogItems="catalogItems" />
      <div :class="$style.productList">
        <nuxt-child />
      </div>
    </section>
  </div>
</template>

<script>
import CatalogList from '@/components/Catalog/CatalogList'
import ProductSort from '@/components/Product/ProductSort'
import {actionTypes} from '@/store/index'
export default {
  name: 'AppCatalog',
  components: {
    CatalogList,
    ProductSort,
  },
  computed: {
    catalogItems() {
      return this.$store.getters.catalogItems
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.selectFromLocalStorage, 'productList')
  },
}
</script>

<style module lang="scss">
.title {
  @include title-text;
}

.catalogHeader {
  display: flex;
  place-items: center;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 24px;
}

.productList {
  width: 100%;
}

.listWrap {
  display: block;

  @media (min-width: 781px) {
    display: flex;
  }
}
</style>
