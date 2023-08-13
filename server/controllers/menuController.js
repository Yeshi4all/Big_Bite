const Menu = require('../models/Menu');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');
const mime = require('mime-types');

/**************************************************************************************************
 * GET
 * 
 ***************************************************************************************************/

 exports.menupage = async (req,res) => {
    const locals = {
        title: 'Menu page',
        description: 'Menu page for the admin'
    }

    let perPage = 10;
    let page = req.query.page || 1;

    try{
        const menus = await Menu.aggregate([{ $sort: {createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        // Iterate through menus and convert the Buffer to a base64 string
        menus.forEach((menu) => {
          menu.imageData = menu.imageData ? menu.imageData.toString('base64') : null;
          // Set the image extension if known (e.g., 'png', 'jpg', etc.)
          //menu.imageExtension = menu.imageData ? 'png' : null; // Replace 'png' with the actual extension if known.
          menu.imageExtension = menu.imageData ? mime.extension(menu.imageMimeType) : null;
        });

        const count = await Menu.count();
        res.render('index', {
            locals,
            menus,
            current: page,
            pages: Math.ceil(count / perPage)});
    }catch(error){
        console.log(error);
        res.status(500).send('Error fetching menu');
    }
 }

 /******************************************************************************************************
  * New Menu form
  ******************************************************************************************************/

 exports.addMenu = async (req,res) => {
    const locals = {
        title: 'Add New Menu',
        description: 'Add new menus for the restaurant'
    }
    res.render('menu/add', locals);
 }

 /**********************************************************************************************************
  * POST
  * Create new Menu
  **********************************************************************************************************/
 exports.postMenu = async (req,res) => {
  console.log(req.file);
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Error uploading image' });
    } else if (err) {
      return res.status(500).json({ error: err.message || 'Unknown error' });
    }

    // Create a new Menu instance with the form data
    const newMenu = new Menu({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      // Convert the image to a base64 string and store it in the image field
      imageData: req.file ? req.file.buffer.toString('base64') : undefined,
    });

    try {
      await Menu.create(newMenu);
      res.redirect('/index');
    } catch (error) {
      console.log(error);
    }
  });

  
    // console.log(req.body);

    // const newMenu = new Menu({
    //     name: req.body.name,
    //     description: req.body.description,
    //     price: req.body.price,
    //     category: req.body.category,
    //   });
    
    // try{
    //     await Menu.create(newMenu);
    //     res.redirect('/index');

    // }catch(error){
    //     console.log(error);
    // }
 }

 /**************************************************************************************************************
  * Get
  * Details of Menu
  **************************************************************************************************************/

 exports.view = async(req,res)=> {
    try{
        const menus = await Menu.findOne({_id: req.params.id})

        const locals = {
            title: "View menu details",
            description: "View details of the menu."
        };

        res.render('menu/view',{
            locals,
            menus
        })

    }catch(error){
        console.log(error);
    }
 }

 /****************************************************************************************************************
  * Get 
  * Edit Menu
  *****************************************************************************************************************/
 exports.edit = async (req, res) => {

    try {
      const menus = await Menu.findOne({ _id: req.params.id })
  
      const locals = {
        title: "Edit Menu Data",
        description: "Edit menu data",
      };
  
      res.render('menu/edit', {
        locals,
        menus
      })
  
    } catch (error) {
      console.log(error);
    }
  
  }

/******************************************************************************************************************
 * GET /
 * Update Menu Data 
*******************************************************************************************************************/
exports.editPost = async (req, res) => {
    try {
      await Menu.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        updatedAt: Date.now()
      });
      await res.redirect(`/edit/${req.params.id}`);
      
      console.log('redirected');
    } catch (error) {
      console.log(error);
    }
  }

/****************************************************************************************************************
 * Delete /
 * Delete Menu Data 
*****************************************************************************************************************/
exports.deleteMenu = async (req, res) => {
    try {
      await Menu.deleteOne({ _id: req.params.id });
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  }