/***********************************************************
 * Rendering Landing page.
 **********************************************************/
exports.homepage = async (req,res) => {
    try{
        res.render('landingPage', { layout: false });
        }catch(error){
            console.log(error);
        }
 }