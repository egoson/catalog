<template>
  <form
    @click="closeCart($event)"
    @submit="sendOrder($event)"
    :class="[$style.transitionBackground, {[$style.backgroundCart]: isActive}]"
  >
    <div
      :class="[
        $style.block,
        $style.cart,
        {[$style.hiddenCart]: !isActive, [$style.scrollActive]: isActive},
      ]"
    >
      <TheCartHeader />
      <TheCartBody
        :selectedCount="selectedCount"
        :successOrder="successOrder"
      />
      <ProductList
        v-if="selectedProducts.length > 0"
        :isCart="true"
        :class="$style.cartProductList"
        :productItems="selectedProducts"
      />
      <template v-if="!successOrder">
        <template v-if="selectedCount">
          <p :class="$style.cartText">Оформить заказ</p>
          <AppInput
            required
            :class="$style.cartInput"
            type="text"
            autocomplete="name"
            placeholder="Ваше имя"
            :value="name"
            @change.native="name = $event.target.value"
          />
          <AppInput
            required
            :class="$style.cartInput"
            v-phone
            type="tel"
            autocomplete="tel"
            placeholder="Телефон"
            :value="phone"
            @change.native="phone = $event.target.value"
          />
          <AppInput
            required
            :class="$style.cartInput"
            type="text"
            placeholder="Адрес"
            :value="adress"
            @change.native="adress = $event.target.value"
          />
        </template>
        <AppButton
          :class="$style.cartBtn"
          type="button"
          v-if="!selectedCount"
          @click="toggleCart"
          >Перейти к выбору</AppButton
        >

        <AppButton v-else :disabled="loading" :class="$style.cartBtn"
          >Отправить</AppButton
        >
      </template>
    </div>
  </form>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import {mapState} from 'vuex'
import AppInput from '@/components/UI/AppInput'
import TheCartBody from '@/components/Cart/TheCartBody'
import TheCartHeader from '@/components/Cart/TheCartHeader'
import {maskPhone, toggleCart} from '@/helpers/appMixins'
import {mutationTypes, actionTypes} from '@/store/index'

export default {
  name: 'TheCart',
  mixins: [maskPhone, toggleCart],
  components: {
    AppButton,
    AppInput,
    TheCartBody,
    TheCartHeader,
  },
  methods: {
    sendOrder(event) {
      event.preventDefault()
      this.$store.dispatch(actionTypes.sendOrder)
    },
    closeCart(event) {
      event.target.tagName !== 'FORM' ||
        this.$store.commit(mutationTypes.toggleCart)
    },
  },
  computed: {
    ...mapState({
      isEmpty: (state) => state.cart.isEmpty,
      successOrder: (state) => state.successOrder,
      customer: (state) => state.customer,
      loading: (state) => state.loading,
    }),
    selectedProducts() {
      return this.$store.getters.cart.products
    },
    selectedCount() {
      return this.$store.getters.selectedCount
    },
    isActive() {
      return this.$store.getters.cart.isActive
    },
    name: {
      get: function () {
        return this.customer.name
      },
      set: function (newValue) {
        this.$store.commit(mutationTypes.setCustomerName, newValue)
      },
    },
    phone: {
      get: function () {
        return this.customer.phone
      },
      set: function (newValue) {
        this.$store.commit(mutationTypes.setCustomerPhone, newValue)
      },
    },
    adress: {
      get: function () {
        return this.customer.adress
      },
      set: function (newValue) {
        this.$store.commit(mutationTypes.setCustomerAdress, newValue)
      },
    },
  },
}
</script>

<style module lang="scss">
.cart {
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  height: 100vh;
  transition: 0.35s;
  will-change: auto;
  max-width: 460px;
  z-index: 2;
}

.cartBtn {
  margin-top: 24px;

  &[disabled] {
    color: transparent;

    &:after {
      display: block;
      color: var(--white);
      content: 'Отправляю...';
      width: 80px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @include animation('loading 1.5s infinite');
    }

    &:hover {
      background-color: var(--black);
      cursor: initial;
    }
  }
}

.cartInput {
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.scrollActive {
  overflow: auto;
  overflow: -moz-scrollbars-none;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.cartProductList {
  margin-bottom: 32px;
}

.transitionBackground {
  transition: 0.25s;
  will-change: auto;
  z-index: 2;
}

.backgroundCart {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--white-08);
  z-index: 2;
}

.hiddenCart {
  transform: translateX(100%);
}

.block {
  @include app-block(52px 48px);
}

.cartText {
  @include app-text(var(--dark-black));
  margin-bottom: 16px;
}
</style>
