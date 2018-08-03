import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

module.exports = {
	mode: 'development',
	entry: './src/js/app.js',
	output: {
		path: `${__dirname}/dest/js`,
		filename: 'app.js'
	},
	plugins: [
		new HardSourceWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: [
								['env', {'modules': false}]
							]
						}
					}
				]
			}
		]
	}
};