<template>
  <div class="hello">
    <button v-on:click="counter += 1">Click Me</button>
  </div>
</template>

<script>
import {HelloRequest} from '../../../../protoc/generated/message_pb'
import {GreeterClient} from '../../../../protoc/generated/message_pb_service'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
