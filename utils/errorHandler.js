

const productionModeHandler=(err,res)=>{

    res.status(400).json({
        status:'fail',
        message:err.message
    })

}

const developmentModeHandler=(err,res)=>{
  res.status(400).json({
    status:'fail',
    message:err.message,
    err
  })
} 
exports.errorHandle= (err,req,res,next)=>{
    if(err.code===11000)
    err.message="Email already exists";
    if(process.env.ENV==='development')
    {
        developmentModeHandler(err,res);
    }
    else
    productionModeHandler(err,req,res,next);
}