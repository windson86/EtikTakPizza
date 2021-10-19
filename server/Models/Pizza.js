const mongoose=require("mongoose")

const PizzaSchema=new mongoose.Schema(
    {
        title: {type: String , required:true,unique:true},
        desc:{type:String,required:true},
        img:{type:String},
        size:{type:String},
        price:{type:Number,required:true}
    },
    {timestamps=true}
)

module.exports= mongoose.model("Pizza",PizzaSchema)
