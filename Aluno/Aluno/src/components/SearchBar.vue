<template>
    <div class="control is-expanded has-icons-right">
    <input class="input" type="text" v-model="searchTerm" placeholder="Localizar por data ou assunto">
    <span class="icon is-right">
  <font-awesome-icon icon="search" />
    </span>
  </div>
  <div class="control">
    <a class="button is-success" @click="handleInput">Filtrar</a>
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
  },
  isMatchingSearchTerm(post) {
const lowerCaseSearch = this.searchTerm.toLowerCase();

 return (
      (post.log_usuario_nome && post.log_usuario_nome.toLowerCase().includes(lowerCaseSearch))
);
  }
};

</script>

<style scoped></style>
