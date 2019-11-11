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
      uri: 'postgres://scott@localhost/pgpubsub',
    },
    main: {
      spools: [
        require('../../dist').PgPubsubSpool
      ]
    }
  }
}


