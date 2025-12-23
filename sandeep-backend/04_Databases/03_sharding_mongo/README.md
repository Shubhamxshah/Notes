1. mongos router: you connect the app to mongos router not directly to db, and router routes to the each shard.
2. shard: shard is the part of database in horizontal scaling, all shards store parts of data.
3. config server: stores metadata like number of shards, shard key, details of fields in shards, it doesnt store actual data but is like the brain that helps router understand where to place a data/read from. mongos router asks and caches this data from config server so it doesnt have to hit for each query. And then connects to each shard. so for first data coming from app, it asks config server where to place it based on shard key etc, and then places it in shard 1 for e.g then for second data it uses the cached data from config server and directly understands where to place it and does the placing.
   /home/shubhamxshah/Pictures/Screenshots/Screenshot from 2025-12-23 08-55-58.png
4. run a config server:

```
 docker run -d --name configsvr1 --net mongo-shard-net -p 27019:27019 mongo:7 mongod --configsvr --replSet configReplSet --port 27019 --bind_ip_all
```

- `-net mongo-shard-net` → attaches container to your custom network
- `-configsvr` → runs MongoDB in **config server mode**
- `-replSet configReplSet` → config servers must be in a replica set
- `-port 27019` → default port for config servers
