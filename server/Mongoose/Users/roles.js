let mongoose = require('mongoose')

let roleSchema = new mongoose.Schema({

    nameRole: {
        type: String,
        required: true,
        unique: true
    }


},
    {
        collection: 'allroles',
    }



)
let Role = mongoose.model('Role', roleSchema);
module.exports = Role;
