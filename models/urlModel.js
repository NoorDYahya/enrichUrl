var url = 'mongodb://localhost:27017/urlBase';
var moongoose = require('mongoose');

moongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


var urlSchema = moongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    url:{
        type: String,
        required: true
    },
    name:{ 
        type: String,
        required: true
    },
    est_emp:{
         type: Number,
         required: true
    },
    industry:{
         type: String,
         required: true 
    },
    annual_rev:{ 
        type: Number,
        required: true 
    },
    country:{
         type: String,
         required: true
    },

})

const Url = moongoose.model('Url',urlSchema);
module.exports = Url;