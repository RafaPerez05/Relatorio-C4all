<template>
  <div class="columns">
    <!-- Dropdown para filtrar por período -->
    <div class="column is-three-fifths">
      <search-bar @search="updateSearchTerm" />
    </div>
  </div>
  <!-- TABELA DE DADOS -->
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Dia</th>
          <th>Hora</th>
          <th>Usuário</th>
          <th>Ação</th>
          <th>Dispositivo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredAndCustomPosts" :key="post._id">
          <!-- SEPARANDO OS A STRING DATA -->
          <td>{{ formatSpecialDate(post.log_acao_data.date) }}</td>
          <td>{{ formatTime(post.log_acao_data.date) }}</td>
          <td>{{ post.log_usuario_nome }}</td>
          <td>{{ post.log_acao_codigo }}</td>
          <td>{{ post.log_dispositivo_nome }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PostService from '../PostService';
import SearchBar from '@/components/SearchBar.vue';



export default {
  components: {
    SearchBar,
  },

  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      searchTerm: '',
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },

  computed: {
    filteredAndCustomPosts() {
      return this.posts.filter(post => this.shouldIncludePost(post));
    }
  },
  methods: {
  //BIBLIOTECA AQUI


  //BARRA DE PESQUISA DAQUI
  shouldIncludePost(post) {

    if (this.searchTerm) {
      return this.isMatchingSearchTerm(post);
    }
    else{
      return true;
    }
  },
  isMatchingSearchTerm(post) {
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    const formattedSearch = this.formatSearchDate(lowerCaseSearch); // Formatar a data inserida

    return (
      (post.log_usuario_nome && post.log_usuario_nome.toLowerCase().includes(lowerCaseSearch)) ||
      (post.log_acao_codigo && post.log_acao_codigo.toLowerCase().includes(lowerCaseSearch)) ||
      (this.formatSpecialDate(post.log_acao_data.date).includes(formattedSearch)) // Usar a data formatada na pesquisa
    );
  },
  formatSearchDate(dateString) {
    // Remova espaços em branco, traços e barras da string de data
    const cleanedString = dateString.replace(/[/\s-]/g, '');

    // Certifique-se de que a string de data tenha 8 caracteres (ddmmyyyy)
    if (cleanedString.length !== 8) {
      return dateString;
    }

    const day = cleanedString.substr(0, 2);
    const month = cleanedString.substr(2, 2);
    const year = cleanedString.substr(4, 4);

    // Certifique-se de que os valores são numéricos
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return dateString;
    }

    // Formatar como "dd/mm/yyyy"
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  },
  formatSpecialDate(dateTime) {
    const dateObj = new Date(dateTime);
    const today = new Date();
    const diffInDays = Math.floor((today - dateObj) / (24 * 60 * 60 * 1000));

    if (diffInDays === 0) {
      return 'Hoje';
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays >= 2 && diffInDays <= 7) {
      const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      return daysOfWeek[dateObj.getDay()];
    } else {
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }
  },
  formatTime(dateTime) {
    const dateObj = new Date(dateTime);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Formatar como "hh:mm:ss"
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  },
  updateSearchTerm(newSearchTerm) {
    this.searchTerm = newSearchTerm;
  }
}

};

</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.error {
  color: red;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
}

.data-table th {
  background-color: #f8f8f8;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}

.data-table tbody tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.2s;
}

/* Estilos para o modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
}

.date-inputs {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.date-inputs label {
  margin-bottom: 0.5rem;
}

.date-inputs input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 1rem;
}

.modal-content button {
  margin-top: 1rem;
}

.icon-text {
  margin-right: 1rem;
  color: #fff;

}
</style>
