const { MongoClient } = require("mongodb");

class MongoDB {
    static connect = async (uri) => {
        debugger
        if(this.client) return this.client;
        this.client = await MongoClient.connect(uri);
        debugger
        return this.client
    }
}

module.exports = MongoDB;