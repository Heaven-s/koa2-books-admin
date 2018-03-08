$('.logout').on('click', function () {
    $.get('/api/logout', function (data) {
        if (data.code === 200) {
            location.href = '/login'
        } else {
            alert(data.message || '退出失败')
        }
    })
})