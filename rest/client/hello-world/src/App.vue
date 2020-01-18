<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button v-on:click="greet">Click Me</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    greet: function () {
       for(let i = 0; i< 100; i++){
         let startDate = new Date().getTime();
        this.$http.post('http://localhost:3000', {
          name: `${i}Name`,
          type: `${i}Type`
        })
        .then(function (response) {
          let endDate = new Date().getTime();
          console.log(`${i} user delta ${endDate-startDate}`);
        }) 
       }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
