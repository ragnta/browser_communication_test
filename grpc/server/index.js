var PROTO_PATH = __dirname + '/../api/message.proto';
const fs = require('fs');
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

function log(call, callback) {
    fs.appendFileSync(`result${call.request.testcase}.csv`,"Number;DeltaTime\n"+call.request.result);
    callback(null, {message: 'Hello World'});
}

server.addService(hello_proto.service.package.Greeter.service, {
    sayHello: sayHello,
    log: log
})
server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
server.start();