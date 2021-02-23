<template>
  <ul :class="$style.productList">
    <li
      :class="$style.productItem"
      v-for="(productItem, index) in productItems"
      :key="index"
    >
      <Product :productIndex="index" :isCart="isCart" :product="productItem" />
    </li>
  </ul>
</template>

<script>
import Product from '@/components/Product/ProductItem'
export default {
  name: 'ProductList',
  components: {
    Product,
  },
  props: {
    productItems: {
      type: Array,
    },
    isCart: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style module lang="scss">
.productList {
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
}

.productItem {
  transition: 0.3s;
}
</style>
