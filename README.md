# spool-pgpubsub

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]


[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


:package: PgPubsub Spool [PG PubSub](https://www.npmjs.com/package/pg-pubsub)

Utilizes [PG PubSub](https://www.npmjs.com/package/pg-pubsub) to add a Fabrix Extension


## Install
```sh
$ npm install --save @fabrix/spool-pgpubsub
```

## Configure

```js
// config/main.ts
import { PgPubsubSpool } from '@fabrix/spool-pgpubsub'
export const main = {
  spools: [
    // ... other spools
    PgPubsubSpool
  ]
}
```

## Configuration

```
// config/pgpubsub.ts
export const pgpubsub = {

}
```


## Usage

```js

// Add a Channel
this.app.spools.pgpubsub.addChannel(name, (payload) => {
  // Do something with Payload when an event is published to channel
})


// Publish to the Channel
this.app.spools.pgpubsub.publish(name, data)


// Completely rid the channel
this.app.spools.pgpubsub.removeChannel(name)
```

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-pgpubsub.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-pgpubsub
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-pgpubsub/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-pgpubsub/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-pgpubsub.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-pgpubsub
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-pgpubsub.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-pgpubsub/coverage

