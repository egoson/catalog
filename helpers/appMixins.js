import {mutationTypes} from '@/store/cart'
import {mapMutations} from 'vuex'

/**
 * Возвращает строку в формате "+7 (ХХХ) ХХХ-ХХ-ХХ"
 */
export const maskPhone = {
  directives: {
    phone: {
      inserted: function (el) {
        el.oninput = function (e) {
          if (!e.isTrusted) {
            return
          }
          if (this.value.length === 18) {
            return
          }
          const x = this.value
            .replace(/\D/g, '')
            .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
          x[1] = '+7'
          this.value = !x[3]
            ? x[1] + ' (' + x[2]
            : x[1] +
              ' (' +
              x[2] +
              ') ' +
              x[3] +
              (x[4] ? '-' + x[4] : '') +
              (x[5] ? '-' + x[5] : '')
        }
      },
    },
  },
}

export const toggleCart = {
  methods: {
    ...mapMutations({
      toggleCartMutation: 'cart/' + mutationTypes.toggleCart,
    }),
    toggleCart() {
      this.toggleCartMutation()
    },
  },
}
