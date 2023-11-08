<template>
  <div class="control is-expanded has-icons-right">
    <input class="input" type="text" v-model="searchTerm" placeholder="Localizar por data ou ação">
    <span class="icon is-right">
      <font-awesome-icon icon="search" />
    </span>
  </div>

</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  emits: ['search'],

  methods: {
    handleInput() {
      this.$emit('search', this.searchTerm);
    }
  }
};
</script>

<style scoped></style>
