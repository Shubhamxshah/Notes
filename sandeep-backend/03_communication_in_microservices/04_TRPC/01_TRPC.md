In Grpc, in proto file, we write definition of types of data it accepts and returns in the .proto file, just like we write interfaces in typescript for type definitions in the same way. 
Then we have generators that we have to install locally, that generates code from the .proto file, it does for each language we have in microservices. 

The problem in nodejs with grpc is that its unable to provide end-to-end type safety. It's where trpc comes in scene. 

