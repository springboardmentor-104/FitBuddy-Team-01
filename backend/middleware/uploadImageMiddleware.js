const multer = require('multer');


const upload = multer({
    storage : multer.diskStorage({
       destination: function(req,file,cb){
            cb(null,"./uploads",)
       },
       filename: function (req, file, cb) {
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
         cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
       }
     })
});

module.exports = {upload}