<template> 



    <div class="is-flex --is-flex-wrap"> 
  
      <!-- Select do periodo --> 
  
      <div class="field mr-4"> 
  
        <label class="label" :for="id">Período:</label> 
  
        <div class="control"> 
  
          <div class="select"> 
  
            <select :id="id" v-model="dadosPeriodo.periodoSelecionado" v-on:change="CarregaPeriodo()" style="min-width: 300px"> 
  
              <option v-for="periodo in itemsPeriodo" :key="periodo" :value="periodo"> 
  
                {{ periodo }} 
  
              </option> 
  
            </select> 
  
          </div> 
  
        </div> 
  
      </div> 
  
   
  
      <!-- Periodo personalizado --> 
  
      <div class="is-flex --is-flex-wrap" v-if="dadosPeriodo.periodoSelecionado == 'Personalizado'"> 
  
        <!-- Periodo inicio --> 
  
        <div class="field mr-3"> 
  
          <div class="control"> 
  
            <label class="label" for="custom-dt-inicio">Início:</label> 
  
            <input 
  
              min="2020-01-01" 
  
              v-bind:max="new Date().toISOString().slice(0, 10)" 
  
              class="input" 
  
              id="custom-dt-inicio" 
  
              v-model="dadosPeriodo.dataInicio" 
  
              type="date" 
  
              required="required" 
  
            /> 
  
          </div> 
  
          <label v-if="dataFinalMenorInicial" class="has-text-warning-dark is-size-7"> Data final menor que inicial. </label> 
  
        </div> 
  
   
  
        <!-- Periodo fim --> 
  
        <div class="field"> 
  
          <div class="control"> 
  
            <label class="label" for="custom-dt-fim">Fim:</label> 
  
            <input 
  
              v-bind:max="new Date().toISOString().slice(0, 10)" 
  
              class="input" 
  
              id="custom-dt-fim" 
  
              v-model="dadosPeriodo.dataFim" 
  
              type="date" 
  
              required="required" 
  
            /> 
  
          </div> 
  
          <label v-if="dataFinalMaiorAtual" class="has-text-warning-dark is-size-7"> Data final maior que atual. </label> 
  
        </div> 
  
   
  
        <!-- Botao buscar --> 
  
        <div> 
  
          <!-- Criar um espacamento no topo --> 
  
          <p class="mb-2">&nbsp;</p> 
  
          <button 
  
            class="button is-link is-outlined ml-4" 
  
            v-on:click="enviaComponentePai(true)" 
  
            :disabled="dataFinalMenorInicial || dataFinalMaiorAtual" 
  
          > 
  
            <span class="icon is-small"> 
  
              <i class="fas fa-search"></i> 
  
            </span> 
  
            <span>Buscar</span> 
  
          </button> 
  
        </div> 
  
      </div> 

      

      

  
    </div> 
   
  
  </template> 
  
   
  
  <script> 
  
  export default { 
    name: 'DropDown',
     components: {
     
     },

    data() { 
    
      return { 
  
        itemsPeriodo: [ 
  
          "Últimos 7 dias", 
  
          "Últimos 14 dias", 
  
          "Últimos 28 dias", 
  
          "Últimos 30 dias", 
  
          "Hoje", 
  
          "Ontem", 
  
          "Essa semana (dom)", 
  
          "Essa semana (seg)", 
  
          "Semana passada (dom)", 
  
          "Semana passada (seg)", 
  
          "Este mês", 
  
          "Mês passado", 
  
          "Este ano", 
  
          "Ano passado", 
  
          "Personalizado", 
  
        ], 
  
        dadosPeriodo: { 
  
          dataInicio: "", 
  
          dataFim: "", 
  
          periodoSelecionado: this.periodoPreSelecionado, 
  
        }, 
  
        dataFinalMenorInicial: false, 
  
        dataFinalMaiorAtual: false, 
  
      }; 
  
    }, 
   
    };
  
  </script> 
  
   
  
   
  
  <style>
  
  .--is-flex-wrap { 
  
    display: flex !important; 
  
    flex-wrap: wrap; 
  
  } 
</style>