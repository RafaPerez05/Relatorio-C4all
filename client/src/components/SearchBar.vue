<template>
    <div class="search-bar">
      <input class="search-input" v-model="searchTerm" placeholder="Pesquisar por usuário" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: ''
      };
    },
    watch: {
      searchTerm(newSearchTerm) {
        this.$emit('search', newSearchTerm);
      }
    }
  };
  </script>



<style scoped>
.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
}

</style>
  