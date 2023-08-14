const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

/*****************************************************************
 * Get
 * ***************************************************************
 * Get index page for the Admin menu page
 ******************************************************************/

router.get('/index', checkAuthenticated, menuController.menupage);

/*********************************************************************
 * Get
 * ********************************************************************
 * Add menu page
 ********************************************************************/

router.get('/add', checkAuthenticated, menuController.addMenu);

/******************************************************************
 * Post
 * ****************************************************************
 * Add new menu 
 ******************************************************************/
router.post('/add', checkAuthenticated, menuController.postMenu);

/*******************************************************************
 * Get
 * ******************************************************************
 * Get details of the menu
 ********************************************************************/

router.get('/view/:id', checkAuthenticated, menuController.view);

/************************************************************************
 * Get
 * **********************************************************************
 * Edit menu page
 ************************************************************************/

router.get('/edit/:id', checkAuthenticated, menuController.edit);

/************************************************************************
 * Put
 * **********************************************************************
 * Update menu 
 ************************************************************************/

router.put('/edit/:id', checkAuthenticated,  menuController.editPost);

/************************************************************************
 * Delete
 * **********************************************************************
 * Delete menu
 ************************************************************************/

router.delete('/edit/:id', checkAuthenticated, menuController.deleteMenu);


//Function to cehck if the user ihas login or not.
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
    }

module.exports = router;