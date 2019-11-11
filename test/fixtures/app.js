'use strict'

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    models: {},
    controllers: {},
    services: {}
  },
  config: {
    pgpubsub: {
      uri: process.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/pubsub',
    },
    main: {
      spools: [
        require('../../dist').PgPubsubSpool
      ]
    }
  }
}


