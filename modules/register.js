const mongoose= require('mongoose');
mongoose.connect('mongodb://rahul:simonadmin@167.172.18.159:27017/emerald',{useNewUrlParser:true , useCreateIndex:true,useUnifiedTopology: true,});

var conn =mongoose.Collection;
var UserSechema=new mongoose.Schema({
    username: String ,
    Firstname: String,
    Lastname : String,
    email : String,
    password : String,
    temppassword : String,
    Mobile : Number,
    Addmemory : { type: Number,      
        enum : [0,1],      
        default: 0  
        },
    payment_status : { type: Number,      
            enum : [0,1],      
            default: 0  
            },
    Registerdate: { type: Date, default: Date.now },
    addeddate: String,
    profile_status : { type: Number,      
        enum : [0,1],      
        default: 1  
        },
})

var deceasedSechema=new mongoose.Schema({
    Firstname: String,
    Middlename : String,
    Lastname : String,
    maidanname : String,
    dob : String,
    dod : String,
    story : String,
    addedby : String,
    addedtime: String,
    added_username : String,
    profileimage : String,
    profileimage1 : String,
    profileimage2 : String,
    private_account : { type: Number,      
        enum : [0,1],      
        default: 0  
        },
    payment_status: { type: Number,      
        enum : [0,1],      
        default: 0  
        },
})

var DecimagesSechema=new mongoose.Schema({
    image: String,
    addedby : String,
})

var imagesSechema=new mongoose.Schema({
    title: String,
    Text: String,
    image: String,
    addedby : String,
    assignImage : { type: Number,      
        enum : [0,1],      
        default: 0  
        },
})

var VideoSechema=new mongoose.Schema({
    title: String,
    Text: String,
    image: String,
    addedby : String,
})

var AudioSechema=new mongoose.Schema({
    title: String,
    Text: String,
    audio: String,
    addedby : String,
})

var StorySechema=new mongoose.Schema({
    title: String,
    story: String,
    addedby : String,
})

var PaymentSechema=new mongoose.Schema({
    Email: String,
    Amount: String,
    Paymentdate: { type: Date, default: Date.now },
    
})

var ProductSechema=new mongoose.Schema({
    producid: String,
    productittle: String,
    productshortdescription : String,
    productdescription: String,
    product_amount : Number,
    product_stock : Number,
    product_category : Array,
    product_status : { type: Number,      
        enum : [0,1],      
        default: 1  
        },
     product_image : String,
     Registerdate: { type: Date, default: Date.now },
     upload_image : { type: Number,      
        enum : [0,1],      
        default: 1  
        },
        add_text : { type: Number,      
            enum : [0,1],      
            default: 1  
            },
    
})
var OrederSechema=new mongoose.Schema({
    buyername:String,
    buyerlastname:String,
    buyeraddress:String,
    buyercity:String,
    buyerstate:String,
    buyerzip:Number,
    buyerphone:Number,
    postalemailaddress:String,
    addedby:String,
    amount:Number,
    Orderid: Number,
    freeproduct: Number,
    account_act: Number,
     Registerdate: String,
     tracking_number: String,

     customer_fname: String,
     customer_mname: String,
     customer_lname: String,
     customer_dob: String,
     customer_dod: String,
     customer_engave: String,
     delivery_status:  { type: Number,      
        enum : [0,1],      
        default: 0  
        }
    
})

var UserOrderSechema=new mongoose.Schema({
    buyeremail:String,
    totalamount:Number,
    product_id:String,
    product_qty: Number,
    productittle: String,
    productdiscount: Number,
    productshortdescription : String,
    productshortimage : String,
    productDesignimage : String,
    wordonproduct: String,
    guestemail: String,
    guestno: String,
    productcat: String,
    uploadedImage: String,
    freeproduct : { type: Number,      
        enum : [0,1],      
        default: 0  
        },
     Addeddate: { type: Date, default: Date.now },
    
})

var UserInvoiceOrder=new mongoose.Schema({
    orderId : String,
    buyeremail:String,
    totalamount:Number,
    product_id:String,
    product_qty: Number,
    productittle: String,
    productdiscount: Number,
    productshortdescription : String,
    productshortimage : String,
    productDesignimage : String,
    wordonproduct: String,
    uploadedImage: String,
    freeproduct : { type: Number,      
        enum : [0,1],      
        default: 0  
        },
    delivery_status : { type: Number,      
            enum : [0,1],      
            default: 0  
            },
     Addeddate: String,
    
})

var product_discount=new mongoose.Schema({
    product_discount: Number,
    free_fith : { type: Number,      
        enum : [0,1],      
        default: 1  
        },
     Addeddate: { type: Date, default: Date.now },
    
})
var USer_discount=new mongoose.Schema({
   totalamount:Number,
    product_id:String,
    email:String,
     Addeddate: { type: Date, default: Date.now },
    
})

var ProductimagesSechema=new mongoose.Schema({
    productid: String,
    image: String,
})

var ProductimagesDesigns=new mongoose.Schema({
    productid: String,
    image: String,
})

var proOrederDesign=new mongoose.Schema({
    proid:String,
    buyeremail:String,
    designimage:String,
    orderstatus: { type: Number,      
        enum : [0,1],      
        default: 0  
        },
        OrderId: String
})

var Productcategory=new mongoose.Schema({
    productcategory: String,
})


var UserModel = mongoose.model('register', UserSechema);
var deceasedData = mongoose.model('deceasedusers', deceasedSechema);
var imagesData = mongoose.model('imagescollection', imagesSechema);
var videosData = mongoose.model('videoscollection', VideoSechema);
var audioData = mongoose.model('audioscollection', AudioSechema);
var paymentData = mongoose.model('paymentcollection', PaymentSechema);
var productData = mongoose.model('productcollection', ProductSechema);
var OrderData = mongoose.model('Orders', OrederSechema);
var UserOrderData = mongoose.model('UserOrders', UserOrderSechema);
var ProductDiscData = mongoose.model('product_discount', product_discount);
var DiscData = mongoose.model('user_disd', USer_discount);
var productextraImages = mongoose.model('productextraImages', ProductimagesSechema);
var productDesign = mongoose.model('productDesigns', ProductimagesDesigns);
 var OrderDesign = mongoose.model('OrderDesigns', proOrederDesign);
var OrderInvoice = mongoose.model('UserInvoiceOrders', UserInvoiceOrder);
var DecProPic = mongoose.model('DecProfilepics', DecimagesSechema);
var DecStory = mongoose.model('DecreasedStory', StorySechema);
var ProductCat = mongoose.model('productcategory', Productcategory);





module.exports= {UserModel,deceasedData,imagesData,videosData,audioData,paymentData,productData,OrderData,UserOrderData,ProductDiscData,DiscData,productextraImages,OrderDesign,productDesign,
    OrderInvoice,conn,DecProPic,DecStory,ProductCat};
