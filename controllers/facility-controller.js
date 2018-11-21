const {mongoose} = require('../db/mongoose');
const Facility = require('../models/facility.js');

exports.create = (req, res) => {
    const facility = new Facility({
        name: req.body.name || "Untitled Facility", 
        address: req.body.address,
        type: req.body.type
    });

    facility.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Facility."
        });
    });
};

exports.findAll = (req, res) => {
    Facility.find()
    .then(facilities => {
        res.send(facilities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving facilities."
        });
    });
};

exports.findOne = (req, res) => {
    Facility.findById(req.params.facilityId)
    .then(facility => {
        if(!facility) {
            return res.status(404).send({
                message: "Facility not found with id " + req.params.facilityId
            });            
        }
        res.send(facility);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Facility not found with id " + req.params.facilityId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving facility with id " + req.params.facilityId
        });
    });
};

exports.update = (req, res) => {
    Facility.findByIdAndUpdate(req.params.facilityId, {
        name: req.body.name || "Untitled Facility", 
        address: req.body.address,
        type: req.body.type
    }, {new: true})
    .then(facility => {
        if(!facility) {
            return res.status(404).send({
                message: "Facility not found with id " + req.params.facilityId
            });
        }
        res.send(facility);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Facility not found with id " + req.params.facilityId
            });                
        }
        return res.status(500).send({
            message: "Error updating facility with id " + req.params.facilityId
        });
    });
};

exports.delete = (req, res) => {
    Facility.findByIdAndRemove(req.params.facilityId)
    .then(facility => {
        if(!facility) {
            return res.status(404).send({
                message: "Facility not found with id " + req.params.facilityId
            });
        }
        res.send(facility);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Facility not found with id " + req.params.facilityId
            });                
        }
        return res.status(500).send({
            message: "Could not delete facility with id " + req.params.facilityId
        });
    });
};
