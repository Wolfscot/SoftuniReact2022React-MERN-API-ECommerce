const userController = {
    register:async(req, res)=>{
        try {
            
        } catch (error) {
            return res.status(500).json({msg:err.msg})
        }
    }
}
module.exports = userController