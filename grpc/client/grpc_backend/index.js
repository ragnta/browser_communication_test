var PROTO_PATH = __dirname + '/../api/message.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  let resultObj = {
  }; 

  for(let i = 0; i < 100; i++){
    
    const startDate = new Date().getTime();
    let client = new hello_proto.service.package.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());

    client.sayHello({name: `${i}user`, type: `${i}type`}, function(err, response) {
      
      const endDate = new Date().getTime();
      
      console.log(`${i} responseTime: ${endDate-startDate}`)
    });
  }
  
  for(const key in resultObj){
    
  }
}

main();