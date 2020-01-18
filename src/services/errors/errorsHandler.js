const errorsHandler = (err, req, res, next) => {
  const response = {
    status: err.status,
    message: err.message,
  };

  res.status(response.status).json(response);
};

module.exports = errorsHandler;
