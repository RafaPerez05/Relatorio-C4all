<template>
  <div class="is-flex --is-flex-wrap">
    <div class="field mr-4"> 
    <label class="label" for="selecionarTipo">Ação:</label> 
    <div class="control"> 
      <div class="select"> 
    <select id="selecionarTipo" v-model="tipoSelecionado" style="min-width: 300px">
      <option value="Todos">Todos</option> 
      <option value="Login/Logout">Login/Logout</option>
      <option value="Aula">Aula</option>
      <option value="Prova">Prova</option>
      <option value="Abriu aula">Abriu aula</option>
      <option value="Realizou entrega do arquivo">Realizou entrega do arquivo</option>
      <option value="Visualizou o historico de aulas realizadas">Visualizou o historico de aulas realizadas</option>
      <option value="Visualizou o historico de provas realizadas">Visualizou o historico de provas realizadas</option>
      <option value="Iniciou a tentativa da habilidade">Iniciou a tentativa da habilidade</option>
      <option value="Realizou aula da habilidade">Realizou aula da habilidade</option>
      <option value="Finalizou a habilidade">Finalizou a habilidade</option>
      <option value="Finalizou o eixo">Finalizou o eixo</option>
      <option value="Finalizou a trilha">Finalizou a trilha</option>
      <option value="Visualizou o ranking">Visualizou o ranking</option>
      <option value="Fez inscrição na turma">Fez inscrição na turma</option>
      <option value="Baixou lista de aula e trilhas">Baixou lista de aula e trilha</option>
      <option value="Baixou a aula ou a trilha">Baixou a aula ou a trilha</option>
      <option value="Sincronizou nota">Sincronizou nota</option>

    </select>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown2',
     components: {
     
     },
  data() {
    return {
      tipoSelecionado: "Todos"
    };
  }

  
};
</script>
