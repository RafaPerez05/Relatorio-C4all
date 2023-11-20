<template>
  <div class="control is-expanded has-icons-right">
    <input class="input" type="text" @input="handleInput" placeholder="Localizar por data ou ação">
    <span class="icon is-right">
      <font-awesome-icon icon="search" />
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    handleInput(event) {
      console.log('Search term:', event.target.value);
      this.$emit('search', event.target.value);
    }
  }
};
</script>

<style scoped></style>
