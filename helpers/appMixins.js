import {mutationTypes} from '@/store/index'

export const maskPhone = {
  directives: {
    phone: {
      inserted: function (el) {
        el.oninput = function (e) {
          if (!e.isTrusted) {
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
    toggleCart() {
      this.$store.commit(mutationTypes.toggleCart)
    },
  },
}
