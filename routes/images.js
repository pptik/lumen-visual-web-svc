const express = require('express');
const router = express.Router();
const moment = require('moment');
const path=require('path');
const multer = require('multer');
const UPLOAD_PATH = './public/temps/';
let shortid = require('shortid');
let JSFtp = require("jsftp");
const fs=require('fs');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + Date.now()+path.extname(file.originalname))
    }

});
let upload = multer({ storage: storage });

router.post('/upload/single',upload.single('imgFile'),function(req,res,next){
    try {
        if(req.file){
            let file =path.join(__dirname, '../public/temps/'+req.file.filename);
            console.log(file);
            let ftpDestFolderAndFileName="STORAGE/LUMENVISUAL/"+req.file.filename;
            let fileHostingPath="http://filehosting.pptik.id/"+ftpDestFolderAndFileName;

            let Ftp = new JSFtp({
                host: "ftp.pptik.id",
                port: 21,
                user: "ftp.pptik.id|ftppptik",
                pass: "XxYyZz123!"
            });
            Ftp.put(file, ftpDestFolderAndFileName, function(err) {
                if (err) console.log(err);
                else {
                    fs.unlink(file,(err => {
                        if(err)console.log(err);
                    }));
                    console.log(fileHostingPath);
                    req.flash('pesan', "File Berhasil Di Upload");
                    res.render('index', { title: 'Lumen Visual' });
                }
            });
        }else {
            req.flash('pesan', "File Tidak Valid");
            res.render('index', { title: 'Lumen Visual' });
        }
    }catch (err){
        console.log(err)
    }
});
module.exports = router;
