import Vuex from 'vuex'
import {getItem, setItem} from '@/helpers/persistanceStorage'

export const mutationTypes = {
  loadingStart: '[Cart] Loading start',
  loadingSuccess: '[Cart] Loading success',
  loadingFailure: '[Cart] Loading failure',
  setProducts: '[Cart] Set Products',
  setCatalogItems: '[Cart] Set Product Categories',
  addProductToCart: '[Cart] Add product',
  clearCart: '[Cart] Clear cart',
  successOrder: '[Cart] Succes order',
  failureOrder: '[Cart] Failure order',
  toggleCart: '[Cart] Toggle cart',
  addProduct: '[Cart] Add product',
  removeProduct: '[Cart] Remove product',
  setCustomerName: '[Cart] Set customer name',
  setCustomerPhone: '[Cart] Set customer phone',
  setCustomerAdress: '[Cart] Set customer adress',
}

export const actionTypes = {
  sendOrder: '[Cart] Send order',
  selectFromLocalStorage: '[Cart] Select from local storage',
  removeProduct: '[Cart] Remove product',
  addProduct: '[Cart] Add product',
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      loading: false,
      products: [],
      error: null,
      successOrder: false,
      selectedCount: 0,
      cart: {
        isActive: false,
        products: [],
      },
      customer: {
        name: null,
        phone: null,
        adress: null,
      },
      catalogItems: null,
    },
    mutations: {
      [mutationTypes.loadingStart](state) {
        state.loading = true
      },
      [mutationTypes.loadingSuccess](state) {
        state.loading = false
      },
      [mutationTypes.loadingFailure](state) {
        state.loading = false
      },
      [mutationTypes.setCatalogItems](state, catalogItems) {
        state.catalogItems = catalogItems
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
        state.cart.products.push(inputProduct)
      },
      [mutationTypes.removeProduct](state, index) {
        state.cart.products.splice(index, 1)
      },
      [mutationTypes.clearCart](state) {
        state.cart.products = []
      },
      [mutationTypes.toggleCart](state) {
        state.cart.isActive = !state.cart.isActive
        state.successOrder = false
      },
      [mutationTypes.successOrder](state) {
        state.successOrder = true
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/product-category')
          .then((catalogItems) => {
            vuexContext.commit(mutationTypes.setCatalogItems, catalogItems)
          })
          .catch((err) => context.error(err))
      },
      [actionTypes.sendOrder](vuexContext, context) {
        vuexContext.commit(mutationTypes.loadingStart)
        return new Promise(() => {
          setTimeout(() => {
            vuexContext.commit(mutationTypes.clearCart)
            setItem('productList', vuexContext.state.cart.products)
            vuexContext.commit(mutationTypes.loadingSuccess)
            vuexContext.commit(mutationTypes.successOrder)
          }, 1000)
        }).catch((err) => context.error(err))
      },
      [actionTypes.selectFromLocalStorage](vuexContext, context) {
        let productList = getItem(context)
        for (let product of productList) {
          vuexContext.commit(mutationTypes.addProduct, product)
        }
      },
      [actionTypes.addProduct](vuexContext, product) {
        vuexContext.commit(mutationTypes.addProduct, product)
        setItem('productList', vuexContext.state.cart.products)
      },
      [actionTypes.removeProduct](vuexContext, productIndex) {
        vuexContext.commit(mutationTypes.removeProduct, productIndex)
        setItem('productList', vuexContext.state.cart.products)
      },
    },
    getters: {
      catalogItems(state) {
        return state.catalogItems
      },
      cart(state) {
        return state.cart
      },
      selectedCount(state) {
        return state.cart.products.length
      },
    },
  })
}

export default createStore
