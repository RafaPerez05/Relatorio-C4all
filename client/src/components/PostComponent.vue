<template>
  <div id="Post">
    <header class="hero is-white is-fixed-top">
    <div class="hero-body">
      <div class="columns is-vcentered">
        <div class="column is-half">
          <DropdownAlunos />
        </div>
        <div class="column is-half"> <!-- Mesma largura aqui -->
          <div class="field has-addons">
            <search-bar @search="updateSearchTerm" />
            
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- TABELA DE DADOS -->
  <table class="table is-fullwidth">
      <thead class="table is-primary custom-table">
        <tr class="tr is-primary custom-tr">
          <th>Dia</th>
          <th>Hora</th>
          <th>Usuário</th>
          <th>Ação</th>
          <th>Dispositivo</th>
        </tr>
      </thead>
      <tbody>
        <!-- Aqui você pode adicionar os dados da tabela usando v-for -->
          <tr v-for="post in filteredAndCustomPosts" :key="post._id">
          <!-- SEPARANDO OS A STRING DATA -->
          <td>{{ formatSpecialDate(post.log_acao_data.date) }}</td>
          <td>{{ formatTime(post.log_acao_data.date) }}</td>
          <td>{{ post.log_usuario_nome }}</td>
          <td>{{ getMensagemByCodigo(post.log_acao_codigo, post) }}</td>
          <td>{{ post.log_dispositivo_nome }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import PostService from '../PostService';
import SearchBar from '@/components/SearchBar.vue';
import DropdownAlunos from '@/components/DropdownAlunos.vue';
//definindo a variavel biblioteca como global aqui -->

const mensagemLibrary = {

  conta_perfil: {
    alterar_senha: "Alterou a senha do perfil.",
    alterar_foto: 'Alterou a foto do perfil.',
    alterar_dados: 'Alterou dados cadastrais do perfil.',
    alterar_email: 'Alterou e-mail do perfil.',
    alterar_cpf: 'Atualizou o CPF para {usuario-cpf}.',
    gerar_senha: 'Gerou senha de acesso.',
    remover_dispositivo: 'Removeu o dispositivo conectado a conta. Dispositivo {device-id} - {device-nome}.',
    associar_google: 'Associou a conta google {conta_google} em seu perfil na plataforma.',
    associar_apple: 'Associou a conta apple {conta-apple} em seu perfil na plataforma.',
    associar_microsoft: 'Associou a conta microsoft {conta-microsoft} em seu perfil na plataforma.',
    desassociar_google: 'Desassociou a conta google {conta_google} em seu perfil na plataforma.',
    desassociar_apple: 'Desassociou a conta apple {conta-apple} em seu perfil na plataforma.',
    desassociar_microsoft: 'Desassociou a conta microsoft {conta-microsoft} em seu perfil na plataforma.'
  },
  conta_acesso: {
    sair: 'Desconectou-se da plataforma.',
    padrao: 'Conectou-se na plataforma com usuário e senha.',
    memorizado: 'Conectou-se na plataforma com login memorizado.', 
    microsoft: 'Conectou-se na plataforma pela conta microsoft {conta-microsoft}.',
    google: 'Conectou-se na plataforma pela conta google {conta_google}.',
    apple: 'Conectou-se na plataforma pela conta apple {conta-apple}.'
  },
  conta_cadastro: {
    padrao: 'Criou uma conta na plataforma com cadastro padrão.',
    microsoft: 'Criou uma conta na plataforma com o login microsoft {conta-microsoft}.',
    google: 'Criou uma conta na plataforma com o login google {conta_google}.',
    apple: 'Criou uma conta na plataforma com o login apple {conta-apple}.'
  },
  conta_recuperar: {
    solicitar: 'Solicitou recuperação da conta por e-mail.',
    redefinir_senha: 'Redefiniu senha de acesso.'
  },
  conta_seguranca: {
    ativar_2fa: 'Ativou autenticação de 2 fatores.',
    atualizar_2fa: 'Atualizou a autenticação de 2 fatores.',
    validar_2fa: 'Validou autenticação de 2 fatores.'
  }
};


export default {
  components: {
    SearchBar,
    DropdownAlunos
  },

  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      searchTerm: '',
      selectedStudent: '',
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
  getMensagemByCodigo(codigo, post) {
    const partes = codigo.split('.');
  if (partes.length === 2 && mensagemLibrary[partes[0]] && mensagemLibrary[partes[0]][partes[1]]) {
    var mensagem = mensagemLibrary[partes[0]][partes[1]];
    
    mensagem = mensagem.replace('{device-nome}', post.log_acao_extra.device_nome);
    mensagem = mensagem.replace('{device-id}', post.log_acao_extra.device_id);
    mensagem = mensagem.replace('{usuario-cpf}', post.log_acao_extra.usuario_cpf);
    mensagem = mensagem.replace('{conta_google}', post.log_acao_extra.conta_google);
    mensagem = mensagem.replace('{conta-microsoft}', post.log_acao_extra.conta_microsoft);
    mensagem = mensagem.replace('{conta-apple}', post.log_acao_extra.conta_apple);

    return mensagem;
  }
  return 'Mensagem não encontrada';
},

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

.custom-table{
  background-color: rgb(227, 231, 234);
}

.table thead td, .table thead th {
    border-width: 0 0 2px;
    color: #4827ab;
}
</style>
