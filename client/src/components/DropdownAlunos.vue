<template>
  <div>
    <div>
      <label v-for="student in students" :key="student">
        <input type="checkbox" v-model="selectedStudents" :value="student" @change="handleCheckboxChange" />
        {{ student }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedStudents: [], // Use um array para armazenar os alunos selecionados
    };
  },
  methods: {
    handleCheckboxChange() {
      // Emita um evento personalizado para informar a seleção ao componente pai
      this.$emit('selected', this.selectedStudents);
    },
  },
  props: {
    students: Array, // Receba a lista de alunos como propriedade do pai
  },
};
</script>