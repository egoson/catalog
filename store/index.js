export const mutationTypes = {
  setCatalogItems: '[Cart] Set Product Categories',
}

export const state = () => ({
  catalogItems: null,
})

export const mutations = {
  [mutationTypes.setCatalogItems](state, catalogItems) {
    state.catalogItems = catalogItems
  },
}

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return context.app.$axios
      .$get('/product-category')
      .then((catalogItems) => {
        vuexContext.commit(mutationTypes.setCatalogItems, catalogItems)
      })
      .catch((err) => context.error(err))
  },
}

export const getters = {
  catalogItems(state) {
    return state.catalogItems
  },
}
