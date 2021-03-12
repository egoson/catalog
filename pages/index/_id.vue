<template>
  <ProductList v-if="productItems.length > 0" :productItems="productItems" />
  <div v-else>Товар закончился :(</div>
</template>

<script>
import ProductList from '@/components/Product/ProductList'
export default {
  components: {ProductList},
  validate({params, store}) {
    return store.state.catalogItems.some((category) => category.id == params.id)
  },
  async asyncData(context) {
    let productItems = await context.$axios.$get('/products.json')
    productItems = productItems.filter(
      (product) => product.brand == context.params.id
    )
    return {productItems}
  },
}
</script>
