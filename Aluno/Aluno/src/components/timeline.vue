<template>
  <div class="container">

    <div class="row">

      <div class="col-md-6">
        <ul class="timeline">
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="has-background-link has-text-white">Hoje</h3>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">08:45</span>
                <p class="is-size-6">Realizou atividade "Números Primos" com nota 100</p>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">08:20</span>
                <p class="is-size-6">Realizou atividade "Bichinhos do Jardim" com nota 100</p>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">08:00</span>
                <p class="is-size-6">Conectou-se na plataforma </p><p class="button is-primary custom-button">Aplicativo</p>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="has-background-link has-text-white ">Ontem</h3>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">11:00</span>
                <p class="is-size-6">Desconectou-se da plataforma</p><p class="button is-primary custom-button"> Aplicativo</p>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">10:05</span>
                <p class="is-size-6">Realizou atividade de entrega "Avaliação"</p>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="has-background-link has-text-white">Segunda-feira</h3>
              </div>
            </div>
          </li>
          <li class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">11:00</span>
                <p class="is-size-6">Desconectou-se da plataforma computador</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {

  data() {

    return {

      searchTerm: "",

    };

  },

  methods: {

    handleInput() {

      this.$emit("search", this.searchTerm);

    },

  },
  watch: {
    searchTerm(newSearchTerm) {
      this.$emit('search', newSearchTerm);
    }
  }
};



</script>

<style scoped>
.timeline-header h3 {
  border: 1px solid #ccc;
  padding: 0.1rem;
  border-radius: 0.25rem;
  width: 10em;
  text-align: center;

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
}

.custom-button {
  height: 1.2rem;
  width: 15%;
  font-size: 0.9rem;
  left: 0.40rem;
}

</style>