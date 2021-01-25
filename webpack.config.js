const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack utilise ce module Node.js pour travailler avec les dossiers.
const path = require('path');


module.exports = (env) => {
  // Ici, faisons un console.log pour voir si ça fonctionne bien :
  console.log("NODE_ENV:", env.NODE_ENV);

  return {
    entry: './src/js/index.js',

    // C'est ici qu'on dit à Webpack où mettre le fichier résultant avec tout ton JS.
    output: {
      // Le chemin relatif au dossier courant (la racine du projet)
      path: path.resolve(__dirname, 'dist'),
      // Le nom du fichier de ton bundle JS
      filename: 'bundle.js',
      // L'URL relatif au HTML pour accéder aux assets de l'application. Ici,
      // le HTML est situé à la racine du projet, donc on met une chaîne vide.
      publicPath: '',
    },

    watch:true,

    module: {
      rules: [

        {
          test: /\.(scss)$/,
          use: [{
            // inject CSS to page
            loader: 'style-loader'
          }, {
            // translates CSS into CommonJS modules
            loader: 'css-loader'
          }, {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          }, {
            // compiles Sass to CSS
            loader: 'sass-loader'
          }]
        },



        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          // Pour le SASS :
              test: /\.(sa|sc|c)ss$/, // On applique notre règle aux fichiers .sass, .scss et .cs
              use: [
                // Attention, les loaders sont ajoutés en sens inverse !!
                // Effectivement, c'est le dernier loader qui est exécuté en premier.
                // Donc celui-ci arrive en fin de chaîne :
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: 'css-loader', // Ce loader permet d'utiliser url() et @import dans ton CSS
                },
                {
                  // Ensuite on utilise le loader de postCSS, qui ajoutera un minifier par exemple,
                  // ou bien un préfixeur automatique des règles CSS (--moz par exemple)
                  loader: 'postcss-loader',
                },
                {
                  // En premier, on transforme le SASS en CSS :
                  loader: 'sass-loader',
                  options: {
                    implementation: require('sass'),
                  },
                },
              ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.css',
      }),
    ],

    mode: 'development',
  };
};