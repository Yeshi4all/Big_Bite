exports.restuarantabout = async (req,res) => {
    try{
        res.render('./dashboard/bigbiteabout', { layout: false });
        }catch(error){
            console.log(error);
        }
 }

 exports.restuaranthome = async (req,res) => {
    try{
        res.render('./dashboard/bigbitehome', { layout: false, });
        }catch(error){
            console.log(error);
        }
 }
 exports.restuarantcontact = async (req,res) => {
    try{
        res.render('./dashboard/bigbitecontact', { layout: false });
        }catch(error){
            console.log(error);
        }
 }