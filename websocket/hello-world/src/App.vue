<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data:()=> {
    return {
      count: 0,
      resultData : {}
    }
  },
  mounted() {
    for(let i = 0; i< 1000; i++){
      this.resultData[i]= new Date().getTime();
      this.$socket.emit("incommingMessage", `{"order": ${i},  "name": "${i}Name",
                  "type": "${i}Type"}`)
    }
    
  },
  sockets:{
    response: async function (data) {
       await new Promise(resolve => {
        const json = JSON.parse(data);
        this.resultData[json.order]=new Date().getTime()-this.resultData[json.order];
        this.count++;
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        if(this.count == 999){
          resolve()
        }
       }) 
      this.$socket.emit("result", JSON.stringify(this.resultData));
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
