exports.create = (req, res) => {
    res.status(201).json({
        message: "create handler",
    })
}

exports.delete = (req, res) => {
    res.status(200).json({
        message: "delete handler",
    })
}

exports.findAll = (req, res) => {
    res.status(200).json({
        message: "find all handler",
    })
}   

exports.findOne = (req, res) => {
    res.status(200).json({
        message: "find one handler",
    })
}

exports.update = (req, res) => {
    res.status(200).json({
        message: "update handler",
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