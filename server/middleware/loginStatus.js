module.exports = (apiPath) => {
    return async (ctx, next) => {
        if (!ctx.request.path.includes('login') && (!ctx.session || !ctx.session.isLogin)) {
            if (ctx.request.path.startsWith(apiPath)) {
                let result = {}
                result.code = 407
                result.message = '请先登录'
                ctx.json(result)
            } else {
                await ctx.response.redirect('/login');
            }
        } else {
            ctx.state.userInfo = {}
            ctx.state.path = ctx.path
            if (ctx.session && ctx.session.userInfo) {
                ctx.state.userInfo = ctx.session.userInfo
            }
            await next()
        }
    }
}