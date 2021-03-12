<template>
  <div
    :class="[{[$style.backgroundCart]: isActive}, $style.transitionBackground]"
    @click.self="toggleCart"
  >
    <form @submit.prevent="sendOrder($event)">
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
          <div :class="$style.inputsWrap">
            <template v-if="selectedCount">
              <div :class="$style.cartTextWrap">
                <p :class="[$style.alertText]" v-if="errorMessage">
                  {{ errorMessage }}
                </p>
                <p v-else>Оформить заказ</p>
              </div>
              <AppInput
                required
                :class="$style.cartInput"
                type="text"
                placeholder="Ваше имя"
                :value="name"
                @change.native="name = $event.target.value"
              />
              <AppInput
                required
                :class="$style.cartInput"
                v-phone
                type="tel"
                placeholder="Телефон"
                :value="phone"
                @input.native="phone = $event.target.value"
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
            <span v-if="totalPrice" :class="$style.totalPrice"
              >К оплате: {{ totalPrice }}</span
            >
            <AppButton
              :class="$style.cartBtn"
              type="button"
              v-if="!selectedCount"
              @click="toggleCart"
              >Перейти к выбору</AppButton
            >
            <AppButton
              v-else
              :class="[$style.cartBtn, {[$style.pending]: loading}]"
              >Отправить</AppButton
            >
          </div>
        </template>
      </div>
    </form>
  </div>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import AppInput from '@/components/UI/AppInput'
import TheCartBody from '@/components/Cart/TheCartBody'
import TheCartHeader from '@/components/Cart/TheCartHeader'
import {maskPhone, toggleCart} from '@/helpers/appMixins'
import {mutationTypes, actionTypes} from '@/store/cart'

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
    ...mapMutations({
      setCustomerName: 'cart/' + mutationTypes.setCustomerName,
      setCustomerPhone: 'cart/' + mutationTypes.setCustomerPhone,
      setCustomerAdress: 'cart/' + mutationTypes.setCustomerAdress,
      setErrorMessage: 'cart/' + mutationTypes.setErrorMessage,
    }),
    ...mapActions({
      sendOrderAction: 'cart/' + actionTypes.sendOrder,
    }),
    sendOrder() {
      if (this.phone && this.phone.length === 18) {
        this.sendOrderAction()
      } else {
        this.setErrorMessage('Номер введен неверно')
      }
    },
  },
  computed: {
    ...mapState('cart', {
      successOrder: (state) => state.successOrder,
      customer: (state) => state.customer,
      loading: (state) => state.loading,
      errorMessage: (state) => state.errorMessage,
    }),
    ...mapGetters('cart', [
      'selectedProducts',
      'selectedCount',
      'isActive',
      'totalPrice',
    ]),
    name: {
      get: function () {
        return this.customer.name
      },
      set: function (newValue) {
        this.setCustomerName(newValue)
      },
    },
    phone: {
      get: function () {
        return this.customer.phone
      },
      set: function (newValue) {
        if (newValue.length <= 18) this.setCustomerPhone(newValue)
      },
    },
    adress: {
      get: function () {
        return this.customer.adress
      },
      set: function (newValue) {
        this.setCustomerAdress(newValue)
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

  .cartProductList {
    margin-bottom: 32px;
    padding-bottom: 290px;
  }
}

.inputsWrap {
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  padding-left: 48px;
  padding-right: 48px;
  padding-bottom: 25px;
  padding-top: 20px;
  max-width: 460px;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 93%,
    rgba(255, 255, 255, 0) 100%
  );
}

.cartBtn {
  margin-top: 24px;

  &[disabled] {
    opacity: 0.7;

    &:hover {
      background-color: var(--black);
      cursor: initial;
    }
  }
}

.pending {
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
    @include animation('pending 1.5s infinite');
  }

  &:hover {
    background-color: var(--black);
    cursor: initial;
  }
}

.cartInput {
  margin-bottom: 16px;
}

.scrollActive {
  overflow: auto;
  overflow: -moz-scrollbars-none;

  &::-webkit-scrollbar {
    width: 0;
  }
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

.totalPrice {
  font-weight: bold;
  display: block;
  text-align: right;
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

.alertText {
  @include alert-text;
}

.cartTextWrap {
  margin-bottom: 10px;
}
</style>
