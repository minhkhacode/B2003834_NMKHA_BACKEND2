const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.contact = client.db().collection("contacts");
    }

    extractContactData(payload){
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        Object.keys(contact).forEach( (key) => {
            return contact[key] === undefined && delete contact[key];
        } )
        debugger
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result= await this.contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite === true} },
            {
                returnDocument: "after",
                upsert: true
            }
        );
        debugger
        return result;
    }

    async find(filter) {
        const cursor = await this.contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        debugger
        return await this.contact.find({
            name: {$regex: new RegExp(name), $options: "i"},
        }) .toArray();
    }

    async findById(id) {
        debugger
        return await this.contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        })
    }

    async findFavorite() {
        return await this.contact.find({
            favorite: true
        }).toArray()
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };

        const update = this.extractContactData(payload);
        const result = await this.contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );

        return result
    }

    async delete(id) {
        return await this.contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null 
        })
    }

    async deleteAll(){
        const result = await this.contact.deleteMany({});
        debugger
        return result.deletedCount;
    }
}

module.exports = ContactService;
