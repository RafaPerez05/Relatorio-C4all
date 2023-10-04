<template>
    <div class="select is-fullwidth">
        <select v-model="selectedStudent" @change="handleSelectChange">
        <option value="">Selecione um aluno</option>
        <option v-for="student in students" :key="student" :value="student">{{ student }}</option>
      </select>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      
      return {
        selectedStudent: "",
      };
    },
    methods: {

    },
  };
  </script>