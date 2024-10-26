const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INT_SERVER_ERROR_CODE = 500;
const CONFLICT = 11000;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const returnError = (res, error) => {
  console.error(error);
  console.error(`ERROR NAME: ${error.name}`);
  console.error(`ERROR CODE: ${error.code}`);

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(BAD_REQUEST_CODE).send({ message: error.message });
  }
  if (error.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND_CODE).send({ message: error.message });
  }
  if (err.name === "DuplicateError") {
    return res.status(CONFLICT).send({ message: error.message });
  }
  if (err.name === "Unauthorized") {
    return res.status(UNAUTHORIZED).send({ message: error.message });
  }
  if (err.name === "Forbidden") {
    return res.status(FORBIDDEN).send({ message: error.message });
  }
  return res.status(INT_SERVER_ERROR_CODE).send({
    message: `${INT_SERVER_ERROR_CODE}: an unknown error has occurred`,
  });
};

module.exports = {
  returnError,
  CONFLICT,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INT_SERVER_ERROR_CODE,
  UNAUTHORIZED,
  FORBIDDEN,
};
