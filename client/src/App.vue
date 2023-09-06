<template>



  <div>
    <div class="header">
      <!-- Conteúdo do cabeçalho aqui -->
    


    <div class="columns">
      <div class="column is-3 mt-2">
        <DropDown />
      </div>
      <div class="column is-5 mt-2">
        <DropDown2 />
      </div>
      <div class="column auto mt-6">
        <CheckBox />
      </div>
    </div>

    <div>
      <timeline />
    </div>
  </div>
    <PostComponent />
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue';


export default {
  name: 'App',
  components: {
    PostComponent,



=======
    CheckBox,
    DropDown,
    DropDown2,
  },
};

</script>

<style>
html,
body {
  background-color: #ffffff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #0080ff;
  padding: 20px; 
  position: relative;
}

.header::after   {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20px; /* aqui modifica a altura da ondulação */
  background: radial-gradient(circle at 50% 0, transparent 0, transparent 15%, #0080ff 16%);
  background-size: 30px 30px; /* tamanho da ondulação */
  z-index: -1;
}


</style>
