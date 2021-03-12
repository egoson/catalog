import {getItem, setItem} from '@/helpers/persistanceStorage'

export const mutationTypes = {
  setErrorMessage: '[Cart] Set error message',
  clearErrorMessage: '[Cart] Clear error message',
  loadingStart: '[Cart] Loading start',
  loadingSuccess: '[Cart] Loading success',
  loadingFailure: '[Cart] Loading failure',
  clearCart: '[Cart] Clear cart',
  successOrder: '[Cart] Succes order',
  failureOrder: '[Cart] Failure order',
  toggleCart: '[Cart] Toggle cart',
  addProduct: '[Cart] Add product',
  deleteProduct: '[Cart] Delete product',
  addProductToCart: '[Cart] Add product',
  removeProduct: '[Cart] Remove product',
  setCustomerName: '[Cart] Set customer name',
  setCustomerPhone: '[Cart] Set customer phone',
  setCustomerAdress: '[Cart] Set customer adress',
  clearErrorMessage: '[Cart] Clear error message',
}

export const actionTypes = {
  sendOrder: '[Cart] Send order',
  selectFromLocalStorage: '[Cart] Select from local storage',
  removeProduct: '[Cart] Remove product',
  deleteProduct: '[Cart] Delete product',
  addProduct: '[Cart] Add product',
}

export const state = () => ({
  errorMessage: null,
  loading: false,
  isActive: false,
  products: [],
  customer: {
    name: null,
    phone: null,
    adress: null,
  },
  successOrder: false,
})

export const mutations = {
  [mutationTypes.setErrorMessage](state, errorMessage) {
    state.errorMessage = errorMessage
  },
  [mutationTypes.clearErrorMessage](state) {
    state.errorMessage = null
  },
  [mutationTypes.loadingStart](state) {
    state.loading = true
  },
  [mutationTypes.loadingSuccess](state) {
    state.loading = false
  },
  [mutationTypes.loadingFailure](state) {
    state.loading = false
  },
  [mutationTypes.setCustomerName](state, data) {
    state.customer.name = data
  },
  [mutationTypes.setCustomerPhone](state, data) {
    state.customer.phone = data
  },
  [mutationTypes.setCustomerAdress](state, data) {
    state.customer.adress = data
  },
  [mutationTypes.addProduct](state, inputProduct) {
    state.products.push(inputProduct)
  },
  [mutationTypes.removeProduct](state, inputProduct) {
    let lastIndex = state.products
      .map((item) => {
        return item.id
      })
      .lastIndexOf(inputProduct.id)

    state.products.splice(lastIndex, 1)
  },
  [mutationTypes.deleteProduct](state, inputProduct) {
    state.products = state.products.filter(
      (product) => product.id !== inputProduct.id
    )
  },
  [mutationTypes.clearCart](state) {
    state.products = []
  },
  [mutationTypes.toggleCart](state) {
    state.isActive = !state.isActive
    state.successOrder = false
  },
  [mutationTypes.successOrder](state) {
    state.successOrder = true
  },
}

export const actions = {
  [actionTypes.sendOrder](vuexContext, context) {
    vuexContext.commit(mutationTypes.loadingStart)
    return new Promise(() => {
      setTimeout(() => {
        vuexContext.commit(mutationTypes.clearCart)
        setItem('productList', vuexContext.state.products)
        vuexContext.commit(mutationTypes.loadingSuccess)
        vuexContext.commit(mutationTypes.successOrder)
        vuexContext.commit(mutationTypes.clearErrorMessage)
      }, 1000)
    }).catch((err) => context.error(err))
  },
  [actionTypes.selectFromLocalStorage](vuexContext) {
    let productList = getItem('productList')
    if (productList) {
      for (let product of productList) {
        vuexContext.commit(mutationTypes.addProduct, product)
      }
    }
  },
  [actionTypes.removeProduct](vuexContext, product) {
    vuexContext.commit(mutationTypes.removeProduct, product)
    setItem('productList', vuexContext.state.products)
  },
  [actionTypes.deleteProduct](vuexContext, product) {
    vuexContext.commit(mutationTypes.deleteProduct, product)
    setItem('productList', vuexContext.state.products)
  },
  [actionTypes.addProduct](vuexContext, product) {
    vuexContext.commit(mutationTypes.addProduct, product)
    setItem('productList', vuexContext.state.products)
  },
}

export const getters = {
  isActive(state) {
    return state.isActive
  },
  selectedProducts(state) {
    let sortedBySameProducts = state.products.reduce(
      (sortedBySameProducts, product, index, array) => {
        let totalSameProducts = array.filter((item) => {
          return item.id === product.id
        })

        let sameProductIndex = sortedBySameProducts.findIndex((item) => {
          return item.id === product.id
        })

        if (sameProductIndex !== -1) {
          sortedBySameProducts[sameProductIndex] = {
            ...product,
            count: totalSameProducts.length,
          }
        } else {
          sortedBySameProducts.push(
            (product = {...product, count: totalSameProducts.length})
          )
        }

        return sortedBySameProducts
      },
      []
    )

    sortedBySameProducts.sort((a, b) => a.title > b.title)

    return sortedBySameProducts
  },
  selectedCount(state) {
    return state.products.length
  },
  totalPrice(state) {
    return state.products.reduce((sum, product, index, array) => {
      return array.length - 1 == index
        ? product.regular_price.currency +
            ' ' +
            (sum + product.regular_price.value).toFixed(2)
        : sum + product.regular_price.value
    }, 0)
  },
}
