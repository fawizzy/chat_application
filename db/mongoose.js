const mongoose = require("mongoose")

const server = '127.0.0.1:27017';
const database = "chat_app"
class Database {
    constructor() {
      this._connect();
    }

    schema(model) {
        if (typeof(model)!=="object"){
            console.log("model not an object");
            return
        }
       return new mongoose.Schema(model)
    }

    model(name, schema) {
        return mongoose.model(name, schema)
    }
    _connect() {
      mongoose
        .connect(`mongodb://${server}/${database}`)
        .then(() => {
          console.log('Database connection successful');
        })
        .catch((err) => {
          console.log(err)
          console.error('Database connection error');
        });
    }
  }
  
  module.exports = new Database();