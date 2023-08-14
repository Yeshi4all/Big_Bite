/**
 * Rendering the About page
 * @param {*} req 
 * @param {*} res 
 */
exports.restuarantabout = async (req,res) => {
    try{
        res.render('./dashboard/bigbiteabout', { layout: false });
        }catch(error){
            console.log(error);
        }
 }

 /**
  * Renfering the home page
  */
 exports.restuaranthome = async (req,res) => {
    try{
        res.render('./dashboard/bigbitehome', { layout: false, });
        }catch(error){
            console.log(error);
        }
 }

 /**
  * Rendering the contact page.
  */
 exports.restuarantcontact = async (req,res) => {
    try{
        res.render('./dashboard/bigbitecontact', { layout: false });
        }catch(error){
            console.log(error);
        }
 }