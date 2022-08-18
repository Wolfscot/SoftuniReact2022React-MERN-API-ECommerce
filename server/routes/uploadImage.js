const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const fs = require('fs')



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// ADMINonly rights
router.post('/upload', auth , admin, (req, res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'Images not uploaded.'})
        
        const file = req.files.file;
        if(file.size > 1200*1200) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Choose smaller image"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Unsupported format"})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "images"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// Delete image only admin can use
router.post('/delete-image',auth , admin, (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})


const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router