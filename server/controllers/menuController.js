const Menu = require('../models/Menu');
const mongoose = require('mongoose');

/***
 * GET
 * 
 */
//  exports.menupage = async (req,res) => {
//     const locals = {
//         title: 'Landing page',
//         description: 'Landing page for the web site'
//     }

//     try{
//         const menus = await Menu.find({}).limit(20);
//         res.render('index', {locals,menus});
//     }catch(error){
//         console.log(error);
//     }
//  }

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
        const count = await Menu.count();
        res.render('index', {
            locals,
            menus,
            current: page,
            pages: Math.ceil(count / perPage)});
    }catch(error){
        console.log(error);
    }
 }





 /**
  * New Menu form
  */

 exports.addMenu = async (req,res) => {
    const locals = {
        title: 'Add New Menu',
        description: 'Add new menus for the restaurant'
    }
    res.render('menu/add', locals);
 }

 /**
  * POST
  * Create new Menu
  */
 exports.postMenu = async (req,res) => {

    console.log(req.body);
    const newMenu = new Menu({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    });

    try{
        await Menu.create(newMenu);
        res.redirect('/index');

    }catch(error){
        console.log(error);
    }
    
 }

 /**
  * Get
  * Details of Menu
  */

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

 /**
  * Get 
  * Edit Menu
  */
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

  /**
 * GET /
 * Update Menu Data 
*/
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

  /**
 * Delete /
 * Delete Menu Data 
*/
exports.deleteMenu = async (req, res) => {
    try {
      await Menu.deleteOne({ _id: req.params.id });
      res.redirect("/")
    } catch (error) {
      console.log(error);
    }
  }