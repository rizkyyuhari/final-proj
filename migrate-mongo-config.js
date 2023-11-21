// In this file you can configure migrate-mongo
const dotenv = require('dotenv');

dotenv.config();
const config = {
  mongodb: {
    url: process.env.DATABASE,

    databaseName: process.env.DBNAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',

  migrationFileExtension: '.js',

  useFileHash: false,

  moduleSystem: 'commonjs'
};

module.exports = config;
