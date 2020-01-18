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

var server = new grpc.Server();

function sayHello(_call, callback) {
    callback(null, {message: 'Hello World'});
}

server.addService(hello_proto.service.package.Greeter.service, {
    sayHello: sayHello
})
server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
server.start();