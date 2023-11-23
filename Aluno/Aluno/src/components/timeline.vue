<template>
  <div id="Post">
    <div class="container mb-4 mt-4">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <span class="icon fas fa-2x mt-3">
              <font-awesome-icon icon="user" />
            </span>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
              <h1 class="has-text-grey is-size-5 m-1 mb-3 mt-3 ml-2" id="user"></h1>
              </p>
            </div>
          </div>
        </article>
      </div>
      <SearchBar @search="updateSearchTerm" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <ul v-for="(posts, date) in groupedPosts" :key="date" class="timeline">
            <span class="tag has-background-info mb-4">
              <label class="label has-text-white">
                {{ date }}
              </label>
            </span>
            <li v-for="post in filteredAndCustomPosts" :key="post._id" class="timeline-item">
              <div class="timeline-content mb-4">
                <div class="timeline-header">
                  <span class="tag has-background-grey-lighter">
                    <label class="label has-text-black is-size-6">
                      {{ formatTime(post.log_acao_data.date) }}
                    </label>
                  </span>
                  <label class="has-text-grey is-size-5 m-1">
                    {{ getMensagemByCodigo(post.log_acao_codigo, post) }}
                  </label>

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
    padrao: 'Conectou-se na plataforma com usuário e senha. {dispositivo_tipo} ',
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
      const filteredUserName = "Luiz Molina";
      const filteredPosts = this.posts.filter(post =>
        post.log_usuario_nome.toLowerCase().includes(filteredUserName.toLowerCase()) && this.shouldIncludePost(post)
      );

      const userCnn = document.getElementById("user");
      userCnn.textContent = filteredUserName;
      return filteredPosts;
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
        mensagem = mensagem.replace('{dispositivo_tipo}', post.log_dispositivo_tipo);

        return mensagem;
      }
      return 'Mensagem não encontrada';
    },

    //BARRA DE PESQUISA DAQUI
    shouldIncludePost(post) {
      return this.isMatchingSearchTerm(post);
    },

    isMatchingSearchTerm(post) {
      const lowerCaseSearch = this.searchTerm.toLowerCase();

      // Se a barra de pesquisa estiver vazia, não filtre nada
      if (!lowerCaseSearch) {
        console.log('Search term is empty, returning true');
        return true;
      }

      const formattedSearch = this.formatSearchDate(lowerCaseSearch);
      const isMatchingDate = this.formatSpecialDate(post.log_acao_data.date).includes(formattedSearch);
      const isMatchingAction = this.getMensagemByCodigo(post.log_acao_codigo, post).toLowerCase().includes(lowerCaseSearch);

      const result = isMatchingDate || isMatchingAction;
      console.log('Is Matching Search Term?', result);
      return result;
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

  // Formatar como "yyyy-mm-dd" para garantir a comparação correta
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
      console.log('Updated search term:', newSearchTerm);
      this.searchTerm = newSearchTerm;
    }
  }
};
</script>

<style scoped></style>