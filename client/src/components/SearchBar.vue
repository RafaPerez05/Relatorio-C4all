<template>
  <div class="control is-expanded has-icons-right">
    <input class="input" type="text" v-model="searchTerm" placeholder="Localizar por data ou assunto">
    <span class="icon is-right">
      <i class="fa fa-search"></i>
    </span>
  </div>
  <div class="control">
    <a class="button is-success" @click="handleInput">Filtrar</a>
  </div>
</template>

<script>
export default {
  emits: ['search'],
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    handleInput() {
      this.$emit('search', this.searchTerm);
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
 