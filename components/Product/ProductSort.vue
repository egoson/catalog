<template>
  <div :class="$style.sortWrap">
    <span :class="$style.sortHeader">Сортировать по: </span>
    <span :class="$style.sortValue" @click="showSortTypes">
      {{ sortType }}</span
    >
    <div :class="$style.sortLabelsWrap" v-show="isShowTypes">
      <label :class="$style.sortLabel">
        По цене
        <input
          @click="closeSortTypes"
          v-show="false"
          type="radio"
          value="цене"
          v-model="sortType"
        />
      </label>

      <label :class="$style.sortLabel">
        По популярности
        <input
          @click="closeSortTypes"
          v-show="false"
          type="radio"
          value="популярности"
          v-model="sortType"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSort',
  data() {
    return {
      isShowTypes: false,
      sortType: 'цене',
    }
  },
  methods: {
    showSortTypes() {
      this.isShowTypes = true
    },
    closeSortTypes() {
      this.isShowTypes = false
    },
  },
}
</script>

<style module lang="scss">
.sortWrap {
  position: relative;
  z-index: 1;
}

.sortHeader {
  @include app-text(var(--black), 16px);
}

.sortValue {
  @include app-text(var(--grey), 16px);
  cursor: pointer;
}

.sortLabel {
  display: block;
  cursor: pointer;
  @include app-text(var(--grey-light), 14px);
  padding: 4px 12px;
}

.sortLabel:hover {
  color: var(--black);
  background-color: var(--grey-extra-light);
}

.sortLabelsWrap {
  padding: 8px 0;
  background-color: var(--white);
  border-radius: 8px;
  position: absolute;
  left: 0;
  width: 100%;
}
</style>
