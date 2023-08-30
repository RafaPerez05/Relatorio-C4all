<template>
  <div class="columns">
  <div class="column is-3 mt-2">
    <DropDown />
  </div>
  <div class="column is-5 mt-2">
    <DropDown2 />
  </div>
  <div class="column auto mt-6">
    <CheckBox  />
  </div>
  </div>

  <div>
  <timeline />
</div>

  
  <PostComponent />

</template>

<script>
import PostComponent from './components/PostComponent.vue';
import CheckBox from './components/Check-Box.vue';
import DropDown from './components/DropDown.vue';
import DropDown2 from './components/DropDown2.vue';

export default{
  name: 'App',
  components: {
    PostComponent,
    CheckBox,
    DropDown,
    DropDown2,


  }
}
</script>

<style>
.body{
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
