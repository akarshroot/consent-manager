const authenticationMiddleware = () => {
  return errorDecorator(async (req, _res, next) => {
    const partnerToken = req.headers['x-partner-token'];
    
  })
}

module.exports = authenticationMiddleware;