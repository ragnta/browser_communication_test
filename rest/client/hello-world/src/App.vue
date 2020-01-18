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
    greet: async function () {
       let resultobj = {};
       await new Promise(resolve => {
        let inc = 0;
        
        for(let i = 0; i< 1000; i++){
                let startDate = new Date().getTime();
                this.$http.post('http://localhost:3000', {
                  name: `${i}Name`,
                  type: `${i}Type`
                })
                .then(function (response) {
                  inc++;
                  let endDate = new Date().getTime();
                  resultobj[i]= endDate-startDate;
                  if(inc == 999){
                    
                    resolve();  
                  }
                  
              }) 
          }
       });
       this.sendResultToServer(resultobj);
    },
    sendResultToServer: function(obj){
      console.log(obj);
      this.$http.post('http://localhost:3000/logresult', {
          testcase: 'REST',
          resultobj: obj
      })
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
