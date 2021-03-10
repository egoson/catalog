<template>
  <div style="overflow: hidden">
    <div :class="$style.catalogHeader">
      <p :class="$style.title">Каталог</p>
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
import {actionTypes} from '@/store/cart'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'AppCatalog',
  components: {
    CatalogList,
  },
  computed: {
    ...mapGetters(['catalogItems']),
  },
  methods: {
    ...mapActions({
      selectFromLocalStorage: 'cart/' + actionTypes.selectFromLocalStorage,
    }),
  },
  mounted() {
    this.selectFromLocalStorage()
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
