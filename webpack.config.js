const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack utilise ce module Node.js pour travailler avec les dossiers.
const path = require('path');

// Ceci est la configuration principale de ton projet.
// Ici, tu peux écrire les différentes options que tu souhaites, et dire à Webpack quoi faire.
module.exports = {

  // Ceci est le chemin vers le "point d'entrée" de ton app.
  // C'est depuis ce fichier que Webpack commencera à travailler.
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

  // Par défaut, le mode de Webpack est "production". En fonction de ce qui est
  // écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
  // Pour le moment, nous avons besoin du mode "développement", car nous n'avons,
  // par exemple, pas besoin de minifier notre code.
  mode: 'development',
};