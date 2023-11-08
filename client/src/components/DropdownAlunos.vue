<template>
  <div class="select is-fullwidth">
    <select v-model="selectedStudent" @change="handleSelectChange">
  <option value=""></option>
  <option v-for="studentName in uniqueStudentNames" :key="studentName" :value="studentName">{{ studentName }}</option>
</select>
 
  </div>
</template>
 
<script>
import axios from 'axios';
 
export default {
  data() {
    return {
      selectedStudent: '',
      students: [],
    };
  },
  created() {
    // Buscar a lista de alunos na API
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        this.students = response.data;
      })
      .catch((error) => {
        console.error('Erro ao buscar alunos:', error);
      });
  },
  computed: {
  uniqueStudentNames() {
    const studentNamesSet = new Set();
    this.students.forEach(student => {
      studentNamesSet.add(student.log_usuario_nome);
    });
    return Array.from(studentNamesSet);
  }
},
  methods: {
    handleSelectChange() {
      // Emitir um evento com o aluno selecionado
      this.$emit('student-selected', this.selectedStudent);
    },
  },
};
</script>