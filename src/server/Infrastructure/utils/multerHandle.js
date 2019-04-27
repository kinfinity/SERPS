import multer from 'multer';

const storage = multer.diskStorage({
    destination:    function(req, file,cb){
        cb(null, '../../app/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname );
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    cb(null,false)
}

const  multerHandle = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10Mb
    },
    fileFilter: fileFilter
})

export default multerHandle;