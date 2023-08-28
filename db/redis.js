const redis =  require("redis")
const promisify = require("util").promisify


class RedisClient{
    constructor(){
        this.client = redis.createClient()
        this.client.on("error", (error)=>{
            console.log(`Redis client not connected to the server ${error}`)
        })
        this.connect().then(()=>console.log("connected"))
    }

    async connect(){
        await this.client.connect()
    }

    isAlive() {
        if (this.client.connected) {
            return true;
          }
          return false;
    }

    async set(key, value, time){
        await this.client.set(key, value,{
            EX: time
        })
    }

    async get(key){
        const value = await this.client.get(key)
        return  value
    }

    async delete(key){
        const deleted = await this.client.del(key, (error, result)=>{          
        })
    }
}

const redisClient = new RedisClient()
module.exports = redisClient

