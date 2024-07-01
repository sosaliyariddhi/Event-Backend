const validationErrorHandler = (err, res) => {
  let feild = Object.keys(err.errors)?.[0];
  res.status(400).json({
    success: false,
    message: err?.errors?.[feild]?.message,
    data: null,
  });
};

export const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (error) {
    if (error.name === "ValidationError") {
      validationErrorHandler(error, res);
    } else {
      res.status(error.statusCode || 500).send({
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
};
