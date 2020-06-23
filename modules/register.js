const mongoose= require('mongoose');
mongoose.connect('mongodb://rahul:simonadmin@localhost:27017/emerald',{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology: true,});

var conn =mongoose.Collection;

module.exports= {conn};