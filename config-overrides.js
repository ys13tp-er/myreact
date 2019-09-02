const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css'
        style: true
    }),
    // 定制主题，使代码支持less，sass
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // 定制主体部分
            // '@primary-color': '#1DA57A'
        },
    }),
);