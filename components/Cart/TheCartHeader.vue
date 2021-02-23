<template>
  <div :class="$style.cartHeader">
    <p :class="$style.title">Корзина</p>
    <button type="button" :class="$style.closeBtn" @click="toggleCart"></button>
  </div>
</template>

<script>
import {toggleCart} from '@/helpers/appMixins'

export default {
  name: 'TheCartHeader',
  mixins: [toggleCart],
}
</script>

<style module lang="scss">
.cartHeader {
  display: flex;
  place-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.closeBtn {
  padding: 10px;
  background-image: url('../../assets/images/close.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 12px;
  cursor: pointer;
}

.title {
  @include title-text;
}
</style>
