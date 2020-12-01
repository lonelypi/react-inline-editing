var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './src/main.jsx',
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'main.bundle.js',
         libraryTarget: 'commonjs2'
     },
     module: {
         rules: [
             {
                 test: /\.js(x)$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             },
             {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
         ]
     },
     externals: {
        'react': 'commonjs react'
     },
     stats: {
         colors: true
     },
 };