<template>
  <nav :class="$style.nav">
    <ul :class="$style.navList">
      <li :class="$style.navItem">
        <nuxt-link :class="$style.logoLink" to="/"> Магазин </nuxt-link>
      </li>
      <li :class="$style.navItem" @click="toggleCart" v-show="!isActive">
        <div :class="{[$style.headerSvgWrap]: isShake}">
          <span v-if="selectedCount" :class="$style.counter">{{
            selectedCount
          }}</span>
          <svg
            :class="$style.headerSvg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.84 3.48C8.06663 3.17783 8.42229 3 8.8 3H23.2C23.5777 3 23.9334 3.17783 24.16 3.48L27.76 8.28C27.9158 8.48772 28 8.74036 28 9V25.8C28 26.7548 27.6207 27.6705 26.9456 28.3456C26.2705 29.0207 25.3548 29.4 24.4 29.4H7.6C6.64522 29.4 5.72955 29.0207 5.05442 28.3456C4.37928 27.6705 4 26.7548 4 25.8V9C4 8.74036 4.08421 8.48772 4.24 8.28L7.84 3.48ZM9.4 5.4L6.4 9.4V25.8C6.4 26.1183 6.52643 26.4235 6.75147 26.6485C6.97652 26.8736 7.28174 27 7.6 27H24.4C24.7183 27 25.0235 26.8736 25.2485 26.6485C25.4736 26.4235 25.6 26.1183 25.6 25.8V9.4L22.6 5.4H9.4Z"
              fill="#1F1F1F"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 9C4 8.33726 4.53726 7.8 5.2 7.8H26.8C27.4627 7.8 28 8.33726 28 9C28 9.66274 27.4627 10.2 26.8 10.2H5.2C4.53726 10.2 4 9.66274 4 9Z"
              fill="#1F1F1F"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.2 12.6C11.8627 12.6 12.4 13.1373 12.4 13.8C12.4 14.7548 12.7793 15.6705 13.4544 16.3456C14.1295 17.0207 15.0452 17.4 16 17.4C16.9548 17.4 17.8705 17.0207 18.5456 16.3456C19.2207 15.6705 19.6 14.7548 19.6 13.8C19.6 13.1373 20.1373 12.6 20.8 12.6C21.4627 12.6 22 13.1373 22 13.8C22 15.3913 21.3679 16.9174 20.2426 18.0426C19.1174 19.1679 17.5913 19.8 16 19.8C14.4087 19.8 12.8826 19.1679 11.7574 18.0426C10.6321 16.9174 10 15.3913 10 13.8C10 13.1373 10.5373 12.6 11.2 12.6Z"
              fill="#1F1F1F"
            />
          </svg>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import {toggleCart} from '@/helpers/appMixins'
import {mapGetters} from 'vuex'

export default {
  name: 'TheHeader',
  mixins: [toggleCart],
  data() {
    return {
      isShake: false,
    }
  },
  computed: {
    ...mapGetters('cart', ['selectedCount', 'isActive']),
  },
  watch: {
    selectedCount: function () {
      this.isShake = true
      setTimeout(() => (this.isShake = false), 500)
    },
  },
}
</script>

<style module lang="scss">
.nav {
  padding: var(--container-padding-mob);
  display: flex;
  justify-content: space-between;
  place-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  height: 66px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--white);
  z-index: 2;

  @media (min-width: 781px) {
    padding: var(--container-padding-desc);
  }
}

.logoLink {
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: var(--grey);
  text-decoration: unset;
}

.navItem {
  position: relative;
}

.counter {
  position: absolute;
  border: 2px solid var(--black);
  border-radius: 6px;
  padding: 2px;
  line-height: 10px;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: unset;
  background-color: white;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
}

.navList {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.headerSvg {
  display: block;
  cursor: pointer;
}

.headerSvgWrap {
  @include animation('shake 0.5s');
}
</style>
