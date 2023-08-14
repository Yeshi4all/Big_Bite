const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const mime = require('mime-types');

/***********************************************************************************************
 * GET
 * Getting the menus from the model Menu
 ********************************************************************************************/

exports.cust_menupage = async (req,res) => {
    try{
        const menus = await Menu.find({});

        // Iterate through menus and convert the Buffer to a base64 string
        menus.forEach((menu) => {
            menu.imageData = menu.imageData ? menu.imageData : null;
            // Set the image extension if known (e.g., 'png', 'jpg', etc.)
            menu.imageExtension = menu.imageData ? mime.extension(menu.imageMimeType) : null;
          });

          
        res.render('dashboard/bigbitemenu', {
            menus,
            layout: false });
    }catch(error){
        console.log(error);
    }
 }