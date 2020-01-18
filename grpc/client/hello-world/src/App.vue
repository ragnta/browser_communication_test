<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button v-on:click="greet">Click Me</button>
  </div>
</template>

<script>
import {HelloRequest, LogRequest} from '../../../protoc/generated/message_pb'
import {GreeterClient} from '../../../protoc/generated/message_pb_service'

export default {
  name: 'app',
  methods: {
    greet: async function (event) {
       let client;
      let resultobj = {};
      await new Promise(resolve => {
        let inc = 0;
        if(process.env.VUE_APP_SINGLE_CLIENT)
          client = new GreeterClient("http://localhost:8100");
        for(let i = 0; i< 1000; i++){
          let startDate = new Date().getTime();
          if(!process.env.VUE_APP_SINGLE_CLIENT)
            client = new GreeterClient("http://localhost:8100");
          const req =  new HelloRequest();
          req.setName(`${i}Name`);
          req.setType(`${i}Type`);
          client.sayHello(req, (err, resp)=>{
            inc++;
            let endDate = new Date().getTime();
            resultobj[i]= endDate-startDate;
            if(inc == 999){
              resolve();  
            }
          })
        }
      })
     this.sendResultToServer(resultobj);
    },
    sendResultToServer: function(obj){
     const client = new GreeterClient("http://localhost:8100");
      const req =  new LogRequest();
      req.setTestcase(`grpc_${process.env.VUE_APP_SINGLE_CLIENT ? 'single': 'every'}`);
      req.setResult(Object.entries(obj).sort((a,b)=> Number(a[0]) - Number(b[0])).map(row => row.join(";")).join("\n"))
      client.log(req, (err, resp)=>{
            console.log
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
