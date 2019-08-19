const resolveHost = function () {
  if (process.env.NODE_ENV !== 'production') {
    return process.env.DEV_HOST+':3000'
  }

  return process.env.PROD_HOST
}

module.exports = {
  resolveHost: resolveHost,
}