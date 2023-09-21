<template>
  <div class="columns">
    <!-- Dropdown para filtrar por período -->

    <div class="column">
      <span class="icon-text">
        <span class="icon">
          <i class="fa fa-calendar fa-lg"></i>
        </span>
      </span>
      <div class="dropdown">
        <select id="date-filter" v-model="selectedPeriod" @change="handlePeriodChange">
          <option value=""> TODOS </option>
          <option value="7">Últimos 7 dias</option>
          <option value="14">Últimos 14 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="custom">Personalizado</option>
        </select>
      </div>
    </div>

    <div class="column is-three-fifths">
      <search-bar @search="updateSearchTerm" />
    </div>

  </div>
  <p class="error" v-if="error">{{ error }}</p>
  <!-- Mensagem de aviso se não houver dados nos últimos 7 dias -->

  <!--TABELA DE DADOS-->
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Data de Acesso</th>
          <th>Hora</th>
          <th>Código de Usuário</th>
          <th>Nome</th>
          <th>Código de Ação</th>
          <th>Dispositivo</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredAndCustomPosts" :key="post._id">
          <td>{{ formatDate(post.log_acao_data.data).date }}</td>
          <td>{{ formatDate(post.log_acao_data.data).time }}</td>
          <td>{{ post.log_usuario_id }}</td>
          <td>{{ post.log_usuario_nome }}</td>
          <td>{{ post.log_dispositivo_nome }}</td>
          <td>{{ post.log_acao_codigo }}</td>
        </tr>
      </tbody>
    </table>
  </div>



  <!-- Modal para selecionar o período personalizado -->
  <div v-if="showCustomPeriodModal" class="modal">
    <div class="modal-content">
      <h2>Selecionar Período Personalizado</h2>
      <div class="date-inputs">
        <label for="custom-start-date">Data Inicial:</label>
        <input type="date" id="custom-start-date" v-model="customStartDate" />

        <label for="custom-end-date">Data Final:</label>
        <input type="date" id="custom-end-date" v-model="customEndDate" />
      </div>
      <button @click="applyCustomPeriod">Aplicar</button>
      <button @click="closeCustomPeriodModal">Fechar</button>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar
  },
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      searchTerm: '',
      selectedPeriod: null,
      showCustomPeriodModal: false,
      customStartDate: '',
      customEndDate: ''
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
      return this.posts.filter(post => {
        const postDate = new Date(post.log_acao_data.data);

        // Filtragem por período selecionado ou personalizado
        if (this.selectedPeriod === 'custom' && this.customStartDate && this.customEndDate) {
          const startDate = new Date(this.customStartDate);
          const endDate = new Date(this.customEndDate);
          return postDate >= startDate && postDate <= endDate;
        } else if (this.selectedPeriod === '7' || this.selectedPeriod === '14' || this.selectedPeriod === '30') {
          const daysAgo = parseInt(this.selectedPeriod, 10);
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - daysAgo);
          return postDate >= startDate;
        }

        // DATA NA BARRA DE PESQUISAAAAAAAAAAAAAAAAAAAAAAAAAAA
        const searchTermDate = new Date(this.searchTerm);
        if (!isNaN(searchTermDate) && isFinite(searchTermDate)) {
          return postDate.toDateString() === searchTermDate.toDateString();
        }

        // Pesquisa por outros campos
        if (this.searchTerm) {
          const lowerCaseSearch = this.searchTerm.toLowerCase();
          return (
            (post.log_usuario_nome && post.log_usuario_nome.toLowerCase().includes(lowerCaseSearch)) ||
            (post.log_texto_acao && post.log_texto_acao.toLowerCase().includes(lowerCaseSearch)) ||
            (post.log_dispositivo_ip && post.log_dispositivo_ip.toLowerCase().includes(lowerCaseSearch))
          );
        }

        // Se nenhum filtro específico ou de pesquisa for aplicado, retornar true para incluir o post
        return true;
      });
    }
  },
  methods: {
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      return {
        date: formattedDate,
        time: formattedTime
      };
    },
    handlePeriodChange() {
      if (this.selectedPeriod === 'custom') {
        this.showCustomPeriodModal = true;
      } else {
        this.showCustomPeriodModal = false;
        // Lógica para outros períodos (7, 14, 30 dias)...
      }
    },
    applyCustomPeriod() {
      const startDate = new Date(this.customStartDate);
      const endDate = new Date(this.customEndDate);

      this.filteredAndCustomPosts = this.posts.filter(post => {
        const postDate = new Date(post.log_data_acesso);
        return postDate >= startDate && postDate <= endDate;
      });

      this.showCustomPeriodModal = false;
    },
    closeCustomPeriodModal() {
      this.showCustomPeriodModal = false;
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
