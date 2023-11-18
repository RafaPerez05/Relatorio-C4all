<template>
 
  <div class="control is-expanded has-icons-right">
    <div class="dropdown" :class="{ 'is-active': dropdownActive }">
      <div class="dropdown-trigger" @click="toggleDropdown">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" style="width: 500px;">
         
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content" style="width: 500px;">
          <label class="checkbox" :key="'selectAll'" style="display: block;">
            <input
              type="checkbox"
              v-model="selectAll"
              @change="handleSelectAll"
            />
            Todos
          </label>
          <label class="checkbox" v-for="studentName in uniqueStudentNames" :key="studentName" style="display: block;">
            <input
              type="checkbox"
              v-model="selectedStudents"
              :value="studentName"
              @change="handleCheckboxChange"
            />
            {{ studentName }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
 
 
<script>
import axios from 'axios';
 
export default {
  data() {
    return {
      selectedStudents: [],
      selectAll: false,
      students: [],
      dropdownActive: false,
      dropdownWidth: '300px', // Defina a largura desejada
    };
  },
  created() {
    axios
      .get('http://localhost:5000/api/posts')
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
      this.students.forEach((student) => {
        studentNamesSet.add(student.log_usuario_nome);
      });
      return Array.from(studentNamesSet);
    },
  },
  watch: {
    selectAll(value) {
      if (value) {
        this.selectedStudents = [...this.uniqueStudentNames];
      } else {
        this.selectedStudents = [];
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
    },
    handleCheckboxChange() {
      this.toggleDropdown();
      this.updateSelectAll();
      this.$emit('students-selected', this.selectedStudents);
    },
    handleSelectAll() {
      if (this.selectAll) {
        this.selectedStudents = [...this.uniqueStudentNames];
      } else {
        this.selectedStudents = [];
      }
      this.$emit('students-selected', this.selectedStudents);
    },
    updateSelectAll() {
      this.selectAll = this.selectedStudents.length === this.uniqueStudentNames.length;
    },
  },
};
</script>
 
<style scoped>
 
</style>