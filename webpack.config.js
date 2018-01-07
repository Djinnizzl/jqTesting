const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src/vendor/jqMobile')
                ],
                use: "imports-loader?$=jquery,jQuery=jquery,this=>window"
            },
            { 
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src/vendor/iScroll')
                ],
                use: "imports-loader?this=>window"
            },
			{
				loader: 'babel-loader',
				test: /\.jsx?$/,
				exclude: [
                    /node_modules/,
                    /vendor/
                ]
            },
            {
				test: /\.s?css$/,
				use: CSSExtract.extract({
					use: [
						{
							loader: 'css-loader',
							query: {
								modules: true,
								localIdentName: '[path]__[name]__[local]___[hash:base64:5]'
							}
						},
						'autoprefixer-loader',
						'sass-loader'
					]
				})
			}
        ]
    },
    resolve: {
        alias: {
            vendor: path.resolve(__dirname, 'src/vendor/'),
            helper: path.resolve(__dirname, 'src/modules/helper/'),
        }
    },
    plugins: [
		CSSExtract
	]
}