const express= require("express");
const upload_file= require("express-fileupload");
const pageRouter=require('./pages');


pageRouter.post('/fileUpload',function(req,res){
    if(req.files){
        console.log(req.files)
    }
})

module.exports=pageRouter;

