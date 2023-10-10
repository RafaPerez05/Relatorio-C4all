
<template>
  <div class="control is-expanded has-icons-right">
    <input class="input" type="text" v-model="searchTerm" placeholder="Localizar por data ou assunto">
    <span class="icon is-right">
      <i class="fa fa-search"></i>
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
  watch: {
    searchTerm(newSearchTerm) {
      this.$emit('search', newSearchTerm);
    }
  }
};

    

 

  </script>

 

   

 

  <style scoped>

input{
  margin-top: 2em;
}


  </style>