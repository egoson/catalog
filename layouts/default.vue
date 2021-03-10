<template>
  <div>
    <TheHeader />
    <TheCart />
    <div :class="$style.container">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheCart from '@/components/Cart/TheCart'
import {mapGetters} from 'vuex'

export default {
  name: 'appLayout',
  data() {
    return {
      scrollbarWidth: null,
    }
  },
  components: {
    TheHeader,
    TheCart,
  },
  computed: {
    ...mapGetters('cart', ['isActive']),
  },
  head() {
    return {
      bodyAttrs: {
        style: this.isActive
          ? 'padding-right: ' + this.scrollbarWidth + 'px;' + ' overflow:hidden'
          : '',
      },
    }
  },
  methods: {
    findScrollBarWidth() {
      let html = document.querySelector('html')
      let offsetHeight = html.offsetHeight
      let clientHeight = html.clientHeight

      if (offsetHeight > clientHeight) {
        let div = document.createElement('div')

        div.style.overflowY = 'scroll'
        div.style.width = '50px'
        div.style.height = '50px'

        document.body.append(div)

        this.scrollbarWidth = div.offsetWidth - div.clientWidth
        div.remove()
      }
    },
  },
  mounted() {
    this.findScrollBarWidth()
  },
}
</script>

<style module lang="scss">
body {
  margin: 0;
  font-family: 'PT Sans', 'Sans-serif';
  padding-top: 66px;
}

.overflowHidden {
  overflow: hidden;
}

.container {
  padding: var(--container-padding-mob);

  @media (min-width: 781px) {
    padding: var(--container-padding-desc);
  }
}
</style>
