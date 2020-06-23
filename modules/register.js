const mongoose= require('mongoose');
mongoose.connect('mongodb://rahul:simonadmin@167.172.18.159:27017/emerald',{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology: true,});

var conn =mongoose.Collection;

module.exports= {conn};