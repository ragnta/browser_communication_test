<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button v-on:click="greet">Click Me</button>
  </div>
</template>

<script>
import {HelloRequest} from '../../../protoc/generated/message_pb'
import {GreeterClient} from '../../../protoc/generated/message_pb_service'

export default {
  name: 'app',
  methods: {
    greet: function (event) {
      for(let i = 0; i< 100; i++){
        let startDate = new Date().getTime();
        const client = new GreeterClient("http://localhost:8100");
        const req =  new HelloRequest();
        req.setName(`${i}Name`);
        req.setType(`${i}Type`);
        client.sayHello(req, (err, resp)=>{
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
