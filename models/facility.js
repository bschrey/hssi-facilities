const mongoose = require('mongoose');

const FacilitySchema = mongoose.Schema({
    name: String,
    address: String,
    type: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Facility', FacilitySchema);