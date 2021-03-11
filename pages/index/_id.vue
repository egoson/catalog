<template>
  <ProductList :productItems="productItems" />
</template>

<script>
import ProductList from '@/components/Product/ProductList'
export default {
  components: {ProductList},
  // validate({params, store}) {
  //   console.log(context.params)
  //   return store.state.catalogItems.some((category) => category.id == params.id)
  // },
  async asyncData(context) {
    const productItems = await context.$axios.$get('/products.json')

    let arrr = [
      {
        brand: 9,
        id: 1,
        image: '/images/1.png',
        regular_price: {currency: 'USD', value: 27.12},
        sku: 's1',
        title: 'Product 1',
        type: 'simple',
      },
      {
        brand: 8,
        id: 2,
        image: '/images/2.png',
        regular_price: {currency: 'USD', value: 36.87},
        sku: 's2',
        title: 'Product 2',
        type: 'simple',
      },
      {
        brand: 2,
        id: 3,
        image: '/images/3.png',
        regular_price: {currency: 'USD', value: 28.91},
        sku: 's3',
        title: 'Product 3',
        type: 'simple',
      },
      {
        brand: 7,
        id: 4,
        image: '/images/4.png',
        regular_price: {currency: 'USD', value: 41.23},
        sku: 's4',
        title: 'Product 4',
        type: 'simple',
      },
      {
        brand: 3,
        id: 5,
        image: '/images/5.png',
        regular_price: {currency: 'USD', value: 88},
        sku: 's5',
        title: 'Product 5',
        type: 'simple',
      },
      {
        brand: 6,
        id: 6,
        image: '/images/6.png',
        regular_price: {currency: 'USD', value: 127.41},
        sku: 's6',
        title: 'Product 6',
        type: 'simple',
      },
      {
        brand: 5,
        id: 7,
        image: '/images/7.png',
        regular_price: {currency: 'USD', value: 123.4},
        sku: 's7',
        title: 'Product 7',
        type: 'simple',
      },
      {
        brand: 1,
        id: 8,
        image: '/images/8.png',
        regular_price: {currency: 'USD', value: 92.32},
        sku: 's8',
        title: 'Product 8',
        type: 'simple',
      },
      {
        brand: 2,
        id: 9,
        image: '/images/9.png',
        regular_price: {currency: 'USD', value: 53.4},
        sku: 's9',
        title: 'Product 9',
        type: 'simple',
      },
    ]

    let users = [
      {id: 1, name: 'Вася'},
      {id: 2, name: 'Петя'},
      {id: 3, name: 'Маша'},
    ]

    // возвращает массив, состоящий из двух первых пользователей
    let someUsers = users.filter((item) => item.id == 1)

    let newArr = arrr.filter((item) => {
      item.brand == 1
    })

    console.log(newArr)

    return {productItems}
  },
}
</script>
