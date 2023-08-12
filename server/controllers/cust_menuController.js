const Menu = require('../models/Menu');
const mongoose = require('mongoose');


/***
 * GET
 * 
 */

exports.cust_menupage = async (req,res) => {
    
    try{
        var menus = await Menu.find({});
        res.render('dashboard/bigbitemenu', {
            menus,
            layout: false });
    }catch(error){
        console.log(error);
    }
 }