// package: helloworld.service.package
// file: message.proto

var message_pb = require("./message_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Greeter = (function () {
  function Greeter() {}
  Greeter.serviceName = "helloworld.service.package.Greeter";
  return Greeter;
}());

Greeter.SayHello = {
  methodName: "SayHello",
  service: Greeter,
  requestStream: false,
  responseStream: false,
  requestType: message_pb.HelloRequest,
  responseType: message_pb.HelloReply
};

Greeter.Log = {
  methodName: "Log",
  service: Greeter,
  requestStream: false,
  responseStream: false,
  requestType: message_pb.LogRequest,
  responseType: message_pb.HelloReply
};

exports.Greeter = Greeter;

function GreeterClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GreeterClient.prototype.sayHello = function sayHello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Greeter.SayHello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

GreeterClient.prototype.log = function log(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Greeter.Log, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.GreeterClient = GreeterClient;

