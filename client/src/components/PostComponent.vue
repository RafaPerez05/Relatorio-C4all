<template>



  <div class="container">
    <search-bar @search="updateSearchTerm" />

    <p class="error" v-if="error">{{ error }}</p>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Data de Acesso</th>
            <th>Código de Usuário</th>
            <th>Ação</th>
            <th>Código de Ação</th>
            <th>Código IP</th>
            <th>Plataforma</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in filteredPosts" :key="post._id">
            <td>{{ formatDate(post.log_data_acesso) }}</td>
            <td>{{ post.log_usuario }}</td>
            <td>{{ post.log_texto_acao }}</td>
            <td>{{ post.log_codigo_acao }}</td>
            <td>{{ post.log_ip }}</td>
            <td>{{ post.log_user_agent }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      searchTerm: ''
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
    filteredPosts() {
      if (!this.searchTerm) {
        return this.posts;
      }
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      return this.posts.filter(post => {
        return (
          post.log_usuario.toLowerCase().includes(lowerCaseSearch) ||
          post.log_texto_acao.toLowerCase().includes(lowerCaseSearch) ||
          post.log_ip.toLowerCase().includes(lowerCaseSearch)
          
        );
      });
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return formattedDate;
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
</style>
