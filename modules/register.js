const mongoose= require('mongoose');
mongoose.connect('mongodb://rahul:simonadmin@localhost:27017/emerald',{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology: true,}).catch(error => handleError(error));

// Or:
try {
  await mongoose.connect('mongodb://rahul:simonadmin@localhost:27017/emerald', { useNewUrlParser: true });
} catch (error) {
  handleError(error);
}

var conn =mongoose.Collection;

module.exports= {conn};