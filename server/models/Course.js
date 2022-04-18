const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
name:{
    type: String,
    required: 'This field is required'
},
description:{
    type: String,
    required: 'This field is required'
},
email:{
    type: String,
    //required: 'This field is required'
},
content:{
    type: Array,
    required: 'This field is required'
},
path:{
    type: String,
    enum: ['CSS','Node','Database','Express','JS'],
    //required: 'This field is required'
},
image:{
    type: String,
    //required: 'This field is required'
},

});

courseSchema.index({ name: 'text', description: 'text'});
//wildcard indexing

module.exports = mongoose.model('Course', courseSchema )