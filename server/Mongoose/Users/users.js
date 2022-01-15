let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({

    telUser: String,
    nameUser: String,
    familiyaUser: String,
    typeUser: {
        type: Array,
        default: ['customers']
    }

},
    {
        collection: 'allusers',
    }



)
let User = mongoose.model('User', userSchema);
module.exports = User;
