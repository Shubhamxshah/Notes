# Communication in Microservices

## 1. Synchronous Communication

Examples include http calls, RPC calls etc.

### RPC (Remote Procedure Calls)

Problem it solves:

1. Lets say you have a app with various microservices written in python, golang, js etc.
   - writing network calls(e.g axios in js, requests in python etc.) to communicate and manage retries failure handling etc in each language becomes difficult.
   - compressing the data before sending so it consumes less space
   - streaming
   - object creation  
     Basically there's something called **_Stubs_** which takes care of serialization, deserialization, request/response etc. and is core part of RPC,
     By solving these complexities RPC helps you focus on business logic instead of fixing these, by hiding the complexities of remote/network calls.

## 2. Asynchronous Communication

Examples include RabbitMQ, Redis queues etc.
