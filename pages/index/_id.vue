<template>
  <ProductList :productItems="productItems" />
</template>

<script>
import ProductList from '@/components/Product/ProductList'
export default {
  components: {ProductList},
  validate({params, store}) {
    return store.state.catalogItems.some((category) => category.id == params.id)
  },
  async asyncData(context) {
    const productItems = await context.$axios.$get(
      '/product?category=' + context.params.id
    )
    return {productItems}
  },
}
</script>
