const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

/**
 * Routes for menus
 */

router.get('/index', checkAuthenticated, menuController.menupage);

/**
 * 
 * Add page render
 */

router.get('/add', checkAuthenticated, menuController.addMenu);

/**
 * 
 * Add new menu post
 */
router.post('/add', checkAuthenticated, menuController.postMenu);

/**
 * 
 * Get details page render
 */

router.get('/view/:id', checkAuthenticated, menuController.view);

/**
 * 
 * Edit page render
 */

router.get('/edit/:id', checkAuthenticated, menuController.edit);

router.put('/edit/:id', checkAuthenticated,  menuController.editPost);

router.delete('/edit/:id', checkAuthenticated, menuController.deleteMenu);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
    }

module.exports = router;