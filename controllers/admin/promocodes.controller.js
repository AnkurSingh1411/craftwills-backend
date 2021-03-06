const promocodeModel = require("../../models/promocodes.model");
const moment = require("moment-timezone");
const { date } = require("joi");

exports.createPromocode = async(req,res)=>{
    try{
       const data = await new promocodeModel({
           discountPromocode : req.body.discountPromocode,
           createdOn : moment().format("YYYY-MM-DD"),
           discountType : req.body.discountType,
           discountValue : req.body.discountValue,
       })
       if (data){
           const savedData = await data.save();
           res.json({
               message : "promocode stored successfully",
               success : true,
               data : savedData
           })
       }
       else{
           res.json({
               message: "something went wrong",
               success : false
           })
       }
    }
    catch(err){
        res.json({
            error : err.message
        })
    }
}

exports.deletePromocode = async(req,res)=>{
    try{
        const id = req.params.id
       const data = await promocodeModel.findByIdAndRemove(id);
       if (data){
           res.json({
               message : "promocode removed successfully",
               success : true,
           })
       }
       else{
           res.json({
               message: "something went wrong",
               success : false
           })
       }
    }
    catch(err){
        res.json({
            error : err.message
        })
    }
}

exports.getPromocode = async(req,res)=>{
    try{

       const data = await promocodeModel.find();
       if (data){
           res.json({
               message : "promocode found successfully",
               success : true,
               data : data
           })
       }
       else{
           res.json({
               message: "something went wrong",
               success : false
           })
       }
    }
    catch(err){
        res.json({
            error : err.message
        })
    }
}