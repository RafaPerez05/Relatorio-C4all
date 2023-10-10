<template>
<div class="select is-fullwidth is-multiple">
  <b-quickview >
    <b-quickview-trigger>
      <select v-model="selectedStudents" @change="handleSelectChange">
        <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}</option>
      </select>
    </b-quickview-trigger>
  </b-quickview>
</div>

</template>

<script>
export default {
  data() {
    return {
      selectedStudents: [],
      students: [
        { id: 1, name: "João" },
        { id: 2, name: "Maria" },
        { id: 3, name: "Pedro" },
        { id: 4, name: "Ana" },
        // alunos fictícios aqui
      ],
    };
  },
  methods: {
    handleSelectChange() {
      // Lógica para lidar com a seleção dos alunos
      // Você pode acessar os alunos selecionados através de this.selectedStudents
      // Exemplo de lógica:
      console.log("Alunos selecionados:", this.selectedStudents);
    },
    toggleDropdown() {
      // Esta função é chamada quando o botão do dropdown é clicado
      // Não é necessário definir showStudents aqui
    },
  },
};
</script>
