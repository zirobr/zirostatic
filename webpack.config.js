const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack')

module.exports = {
	entry: './index.js',
	plugins: [
		new HtmlWebpackPlugin({ template: './index.html' }),
		new webpack.DefinePlugin({
			'process.env': {
				SHEET_TOKEN: JSON.stringify(process.env.SHEET_TOKEN),
				SHEET_ID: JSON.stringify(process.env.SHEET_ID),
				SHEET_URL: JSON.stringify(process.env.SHEET_URL)
			}
		}),
		new FileManagerPlugin({
			onEnd: {
				move: [
					{ source: './dist/main.js', destination: './main.js'},
				]
			}
		})
	]
}