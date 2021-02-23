<template>
  <div :class="$style.donePage" v-if="successOrder">
    <img :class="$style.successImage" src="@/assets/images/ok.png" />
    <p :class="$style.successMessage">Заявка успешно отправлена</p>
    <p :class="$style.successText">Вскоре наш менеджер свяжется с Вами</p>
  </div>
  <div v-else>
    <p v-if="selectedCount" :class="$style.cartText">Товары в корзине</p>
    <p v-else :class="$style.cartText">
      Пока что вы ничего не добавили в корзину
    </p>
  </div>
</template>

<script>
export default {
  name: 'TheCartBody',
  props: {
    selectedCount: {
      type: Number,
      default: false,
    },
    successOrder: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style module lang="scss">
.cartText {
  @include app-text(var(--dark-black));
  margin-bottom: 16px;
}

.donePage {
  @include absolute-center;
  width: 100%;
  text-align: center;
}

.successMessage {
  @include title-text(24px, 31px);
}

.successImage {
  margin: auto auto 24px auto;
}

.successText {
  @include app-text(var(--grey), 16px);
}
</style>
