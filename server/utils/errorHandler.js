class ErrorHandler extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail': 'error'
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports = ErrorHandler