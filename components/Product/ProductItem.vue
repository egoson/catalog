<template>
  <div
    :class="[
      {[$style.product]: !isCart, [$style.removingItem]: hideAnimation},
      $style.productSmall,
    ]"
  >
    <img
      :class="$style.photo"
      :src="require('~/assets' + product.image)"
      :alt="product.name"
    />
    <div :class="$style.productInner">
      <div :class="$style.titleBlock">
        <h1 :class="$style.title">{{ product.title }}</h1>
        <span :class="$style.price"> {{ product.regular_price.currency }} {{ product.regular_price.value }}</span>
      </div>
    </div>
    {{product.count}}
    
    <span
      :class="$style.btn"
      @click="addProductItem(product)"
    >+</span>
    <ProductBtn
      :class="$style.btn"
      @click="
        isCart
          ? removeProductItem(product)
          : addProductItem(product)
      "
    />
  </div>
</template>

<script>
import ProductBtn from '@/components/Product/ProductBtn'
import {actionTypes} from '@/store/cart'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProductItem',
  components: {
    ProductBtn,
    
  },
  inject: ['isCart'],
  data() {
    return {
      hideAnimation: false,
    }
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    productIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['productList']),
  },
  methods: {
    ...mapActions({
      removeProduct: 'cart/' + actionTypes.removeProduct,
      addProduct: 'cart/' + actionTypes.addProduct,
    }),
    addProductItem(product) {
      this.addProduct(product)
    },
    removeProductItem(product) {
      this.hideAnimation = true
      setTimeout(() => {
        this.removeProduct(product)
        this.hideAnimation = false
      }, 350)
    },
  },
}
</script>

<style module lang="scss">
.productSmall {
  @include app-block(12px 22px 12px);
  display: flex;
  margin-bottom: 12px;
  position: relative;
  right: 0;

  .photo {
    width: 40%;
    height: 100%;
    flex-shrink: 0;
  }

  .title {
    @include app-text(var(--grey), 14px);
    font-weight: normal;
    line-height: 18px;
  }

  .btn {
    margin: auto 0 auto auto;
  }

  .price {
    @include app-text(var(--black), 14px);
    font-weight: bold;
    line-height: 18px;
  }

  .rating {
    margin-top: auto;
  }

  .productInner {
    display: flex;
    flex-direction: column;
  }
}

// .removingItem {
//   transition: 0.35s;
//   position: relative;
//   right: -200%;
// }

@media (min-width: 781px) {
  .product {
    display: block;

    .photo {
      width: 100%;
    }

    .btn {
      position: absolute;
      top: 18px;
      right: 18px;
    }

    .rating {
      position: absolute;
      top: 18px;
      left: 18px;
    }
  }
}
</style>
