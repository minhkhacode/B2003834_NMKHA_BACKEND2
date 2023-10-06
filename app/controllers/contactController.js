const ContactService = require("../../services/contact.service.js")
const MongoDB = require("../utils/mongodb.util.js")
const ApiError = require("../api-error.js")

exports.delete = (req, res) => {
    res.status(200).json({
        message: "delete handler",
    })
}  

exports.deleteAll = (req, res) => {
    res.status(200).json({
        message: "delete all handler",
    })
}

exports.findAllFavorate = (req, res) => {
    res.status(200).json({
        message: "find all favorate handler",
    })
}

exports.findByID = (req, res) => {
    res.status(200).json({
        message: `find contact ${req.params.id} handler`,
    })
}   

exports.updateByID = (req, res) => {
    res.status(200).json({
        message: `update contact ${req.params.id} handler`,
    })
}

exports.deleteById = (req, res) => {
    res.status(200).json({
        message: `delete contact ${req.params.id} handler`,
    })
}

exports.create = async (req, res, next) => {
    // debugger
    if(!req.body?.name)
        return next(new ApiError(400, "Name can not be empty"));
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        // debugger
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        )
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, " An error occurred while  retrieving contacts")
        );
    }

    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const contacService = new ContactService(MongoDB.client);
        debugger
        const document = await contacService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        )
    }
}

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occured while retrivieving favorite contacts"));
    }
}

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contacService = new ContactService(MongoDB.client);
        const document = await contacService.update(req.params.id, req.body);
        if(!document){
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next (new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const contacService = new ContactService(MongoDB.client);
        const document = await contacService.delete(req.params.id);
        if(!document){
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next (new ApiError(500, `Could not delete contact with id=${req.params.id}`))
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`
        })
    } catch (error) {
        return next (new ApiError(500, `An error occured while removing all contacts`))
    }
}