<template>
<div class="container">
  <navbar />
  <timeline />
</div>


</template>





<script>

import navbar from './components/navbar.vue';
import timeline from './components/timeline.vue';




export default{
  name: 'App',

  components:{

    navbar,
    timeline
    

  },
};







</script>







<style>

.container{
  width: 100%;
  height: auto;
}
</style>