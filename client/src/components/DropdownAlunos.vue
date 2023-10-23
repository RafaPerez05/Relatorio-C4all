<template>
  <div class="select is-fullwidth is-multiple">
    <b-quickview>
      <b-quickview-trigger>
        <select v-model="selectedStudent" @change="handleSelectChange">
          <!-- Use as opções formatadas com ID e nome -->
          <option v-for="student in formattedStudents" :key="student._id" :value="student._id">{{ student.text }}</option>
        </select>
      </b-quickview-trigger>
    </b-quickview>
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
    // Buscar a lista de alunos no banco de dados MongoDB
    axios.get('http://localhost:5000/api/posts') // Substitua '/api/alunos' pelo endpoint correto
      .then((response) => {
        this.students = response.data;
        console.log('Dados dos alunos:', this.students);
      })
      .catch((error) => {
        console.error('Erro ao buscar alunos:', error);
      });
  },
  computed: {
    // Crie uma computed property para formatar as opções do Dropdown
    formattedStudents() {
      return this.students.map((student) => ({
        _id: student._id,
        text: `ID: ${student._id} - Nome: ${student.name}`,
      }));
    },
  },
  methods: {
    handleSelectChange() {
      console.log('Aluno selecionado:', this.selectedStudent);
    },
    toggleDropdown() {
      // Esta função é chamada quando o botão do dropdown é clicado
      // Não é necessário definir showStudents aqui
    },
  },
};
</script>
