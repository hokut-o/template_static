module.exports = {
	mode: 'production',
	entry: './src/js/app.js',
	output: {
		path: `${__dirname}/dest/js`,
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
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
