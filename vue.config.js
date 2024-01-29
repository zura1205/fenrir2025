module.exports = {
    devServer: {
        proxy: {
            '^/hotpepper/': {
                target: 'http://webservice.recruit.co.jp', 
                changeOrigin: true
            },
        }
    }
}