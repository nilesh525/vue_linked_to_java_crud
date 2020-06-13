module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
    // devServer: {
    //     //disableHostCheck: true
    //     open: process.platform === 'darwin',
    //     host: '0.0.0.0',
    //     port: 8085, // CHANGE YOUR PORT HERE!
    //     https: true,
    //     hotOnly: false,
    //   }
}