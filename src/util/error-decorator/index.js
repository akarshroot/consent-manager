const errorDecorator = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    if (error.output.statusCode < 500) {
      return res.status(error.output.statusCode).json({
        error: { message: error.message },
        is_success: false,
      })
    }
  }
}

module.exports = errorDecorator;