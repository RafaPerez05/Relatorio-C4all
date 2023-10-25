<template>
  <div class="select is-fullwidth is-multiple">
    <b-quickview>
      <b-quickview-trigger>
        <select v-model="selectedStudent" @change="handleSelectChange">
          <!-- Use as opções formatadas com ID e nome -->
          
          <option v-for="student in formattedStudents" :key="student._id" :value="student._id">{{ student.text }}</option>
          <option v-for="student in filteredAndCustomstudents" :key="student._id">{{ student.log_usuario_nome }}</option>
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
    formattedStudents() {
  const uniqueStudentNames = new Set();
  return this.students.reduce((formatted, student) => {
    if (!uniqueStudentNames.has(student.log_usuario_nome)) {
      uniqueStudentNames.add(student.log_usuario_nome);
      formatted.push({
        _id: student._id,
        text: student.log_usuario_nome,
      });
    }
    return formatted;
  }, []);
},
    // Crie uma computed property para formatar as opções do Dropdown
  },
  methods: {
    handleSelectChange() {
      const selectedStudent = this.students.find(student => student._id === this.selectedStudent);
  if (selectedStudent) {
    console.log('Aluno selecionado:', selectedStudent);
  }
    },
    toggleDropdown() {
      // Esta função é chamada quando o botão do dropdown é clicado
      // Não é necessário definir showStudents aqui
    },
  },
};
</script>
