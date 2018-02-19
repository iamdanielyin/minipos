module.exports = async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.body = 'App is running.'
  } else {
    await next();
  }
};