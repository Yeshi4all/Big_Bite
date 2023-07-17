const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

/**
 * Routes for menus
 */

router.get('/index', menuController.menupage);

/**
 * 
 * Add page render
 */

router.get('/add', menuController.addMenu);

/**
 * 
 * Add new menu post
 */
router.post('/add', menuController.postMenu);

/**
 * 
 * Get details page render
 */

router.get('/view/:id', menuController.view);

/**
 * 
 * Edit page render
 */

router.get('/edit/:id', menuController.edit);

router.put('/edit/:id', menuController.editPost);
router.delete('/edit/:id', menuController.deleteMenu);



module.exports = router;