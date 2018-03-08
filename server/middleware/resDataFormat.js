module.exports = (apiPath) => {
    return async (ctx, next) => {
        if (ctx.request.path.startsWith(apiPath)) {
            ctx.json = (result) => {
                let { data = null, code = 200, message } = result
                if (!message) {
                    message = code == 200 ? '请求成功' : '请求失败'
                }
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    data,
                    code,
                    message
                }
            } 
            try {
                await next()
            } catch (e) {
                ctx.response.status = 400;
                ctx.json({
                    data: null,
                    code: e.code || 'internal:unknown_error',
                    message: e.message || ''
                })
            }
        } else {
            await next()
        }
    }
}