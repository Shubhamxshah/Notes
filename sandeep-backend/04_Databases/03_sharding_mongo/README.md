1. mongos router: you connect the app to mongos router not directly to db, and router routes to the each shard.
2. shard: shard is the part of database in horizontal scaling, all shards store parts of data.
3. config server: stores metadata like number of shards, shard key, details of fields in shards, it doesnt store actual data but is like the brain that helps router understand where to place a data/read from. mongos router asks and caches this data from config server so it doesnt have to hit for each query. And then connects to each shard. so for first data coming from app, it asks config server where to place it based on shard key etc, and then places it in shard 1 for e.g then for second data it uses the cached data from config server and directly understands where to place it and does the placing.
   <img width="1893" height="1082" alt="Screenshot from 2025-12-23 08-55-58" src="https://github.com/user-attachments/assets/cf56a961-f89a-4f71-ac86-d8683e112602" />

4. Steps:

a. Create a network:

```
docker network create mongo-shard-net
```

b. run a config server:

```
 docker run -d --name configsvr1 --net mongo-shard-net -p 27019:27019 mongo:7 mongod --configsvr --replSet configReplSet --port 27019 --bind_ip_all
```

- `-net mongo-shard-net` → attaches container to your custom network
- `-configsvr` → runs MongoDB in **config server mode**
- `-replSet configReplSet` → config servers must be in a replica set for reliability (all configservers should use same name)
- `-port 27019` → default port for config servers

c. you need to initiate configserver with rs.initiate inside container:

```
rs.initiate({
  _id: "configReplSet",
  configsvr: true,
  members: [
    { _id: 0, host: "configsvr1:27019" },
    { _id: 1, host: "configsvr2:27019" },
    { _id: 2, host: "configsvr3:27019" }
  ]
})
```

d. Create Shards:

```
docker run -d --name shard2 --net mongo-shard-net -p 27021:27021 mongo:7 mongod --shardsvr --replSet shard2ReplSet --port 27021 --bind_ip_all
```

Replicaset initilaize in mongodb shard:

```
rs.initiate({
  _id: "shard2ReplSet",
  members: [
    { _id: 0, host: "shard2:27021" }
  ]
})
```

**Breakdown:**

- `-name shard2` → names the container `shard2`
- `-net mongo-shard-net` → attaches container to your custom Docker network so it can talk to other Mongo containers
- `p 27021:27021` → maps host port `27021` to container’s MongoDB port `27021`
- `mongo:7` → pulls and runs official MongoDB v7 image
- `mongod` → runs MongoDB daemon
- `-shardsvr` → runs this node in **shard server mode**
- `-replSet shard2ReplSet` → puts this shard in a replica set called `shard2ReplSet` (shards must run as replica sets in sharded clusters)
- `-port 27021` → port this MongoD listens on
- `-bind_ip_all` → allows connections from any IP (important for Docker networking)

e. Mongo Router:

```
docker run -d --name mongos --net mongo-shard-net -p 27020:27020 mongo:7 mongos --configdb configReplSet/configsvr1:27019 --bind_ip_all --port 27020
```

**Breakdown:**

- `-name mongos` → names the container `mongos`
- `-net mongo-shard-net` → attaches container to same Docker network for inter-container communication
- `p 27020:27020` → exposes `mongos` router on host port `27020`
- `mongo:7` → official MongoDB v7 image
- `mongos` → runs the **Mongo router** (not `mongod`)
- `-configdb configReplSet/configsvr1:27019` → tells `mongos` where the **config server replica set** is located
  (⚠️ in production you should list all config servers, e.g. `configsvr1:27019,configsvr2:27019,configsvr3:27019`)
- `-bind_ip_all` → allows external + container network connections
- `-port 27020` → runs `mongos` router on port `27020`

```jsx
sh.addShard("shard1ReplSet/shard1:27018");
sh.status();
sh.enableSharding("testDB");
sh.shardCollection("testDB.myCollection", { _id: "hashed" });
```
