
class appError extends Error
{
    constructor(message,statusCode)
    {
        super(message);
        this.message=message;
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?'Failed':'error';
        this.isOperational=true;             // creating a flag for recognizing if it is a produced error or not
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports=appError;