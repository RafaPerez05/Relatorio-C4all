<template>
  <div id="Post">
    <SearchBar @search="updateSearchTerm" />
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <ul v-for="(posts, date) in groupedPosts" :key="date" class="timeline">
            <h3 class="has-background-link has-text-white">{{ date }}</h3>
            <li v-for="post in posts" :key="post._id" class="timeline-item">
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="timeline-date">{{ formatTime(post.log_acao_data.date) }}</span>
                  <p class="is-size-6">{{ getMensagemByCodigo(post.log_acao_codigo, post) }}</p>
                  <p class="button is-primary custom-button"> Aplicativo</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import PostService from '../PostService';

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
  },

  name: 'timeline',
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
      return this.posts.filter(post => this.isMatchingSearchTerm(post));
    },
    groupedPosts() {
      const grouped = {};
      this.posts.forEach(post => {
        const formattedDate = this.formatSpecialDate(post.log_acao_data.date);
        if (!grouped[formattedDate]) {
          grouped[formattedDate] = [];
        }
        grouped[formattedDate].push(post);
      });
      return grouped;
    },
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
        return (
          this.isMatchingSearchTerm(post) &&
          post.log_usuario_nome && post.log_usuario_nome.toLowerCase() === 'luiz molina'
        );
      } else {
        return post.log_usuario_nome && post.log_usuario_nome.toLowerCase() === 'luiz molina';
      }
    },
    isMatchingSearchTerm(post) {
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      if (!lowerCaseSearch) {
        return true; // Se a barra de pesquisa estiver vazia, não filtre nada
      }

      const formattedSearch = this.formatSearchDate(lowerCaseSearch); // Formate a data de pesquisa
      const isMatchingDate = this.formatSpecialDate(post.log_acao_data.date).includes(formattedSearch);

      // Verifique se o termo de pesquisa corresponde a uma ação na biblioteca
      const isMatchingAction = this.getMensagemByCodigo(post.log_acao_codigo, post).toLowerCase().includes(lowerCaseSearch);

      // Retorna verdadeiro se houver correspondência em data ou ação
      return isMatchingDate || isMatchingAction;
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
.is-size-6 {
  margin-left: 1rem;
}

.timeline-header h3 {
  border: 1px solid #ccc;
  padding: 0rem 0.4rem;
  border-radius: 0.25rem;
  width: auto;
  font-size: 1.1rem;
  text-align: center;
  font-weight: bold;

}


.timeline-header h3.is-primary {
  color: #fff;
  background-color: rgb(132, 132, 255);
}



.container {
  width: 50%;
  margin: 0 auto;
  margin-left: 0rem;
}

.timeline {
  list-style-type: none;
  padding: 2rem;
}

.timeline-item {
  margin-bottom: 0rem;
}

.timeline-content {
  padding: 1rem;
  background-color: #fff;
}

.timeline-header {
  display: flex;
  align-items: center;
}

.timeline-date {
  background-color: rgba(199, 191, 191, 0.267);
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: #000;
  font-weight: bold;
}

.custom-button {
  height: 1.2rem;
  width: auto;
  font-size: 0.9rem;
  left: 0.40rem;
  padding: 0rem 0.3rem;
}
</style>