const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)

  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if(err.code && err.code === 11000){
    customError.msg = `email ${err.keyValue.email} already taken`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name === 'CastError'){
    customError.msg= `no item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware
