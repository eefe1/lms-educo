const mongoose = require('mongoose');

const PathSchema = new mongoose.Schema({
name:{
    type: String,
    required: 'This field is required'
},
image:{
    type: String,
    required: 'This field is required'
},
});

module.exports = mongoose.model('Path', PathSchema )