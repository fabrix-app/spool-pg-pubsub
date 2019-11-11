'use strict'
/* global describe, it */
const assert = require('assert')

describe('PgPubSub', () => {
  it('should have the extension installed on app namespace', () => {
    assert(global.app.pgpubsub)
  })

  it('should have subscribers set', () => {
    assert(global.app.spools.pgpubsub.subscribers)
  })

  it('should have functions', () => {
    assert(global.app.spools.pgpubsub.addChannel)
  })
  it('should have functions', () => {
    assert(global.app.spools.pgpubsub.removeChannel)
  })
  it('should have functions', () => {
    assert(global.app.spools.pgpubsub.publish)
  })
  it('should have functions', () => {
    assert(global.app.spools.pgpubsub.subscribe)
  })
  it('should have functions', () => {
    assert(global.app.spools.pgpubsub.unsubscribe)
  })

  it('should add Channel', (done) => {
    global.app.spools.pgpubsub.addChannel('test', (payload) => {
      console.log(payload)
    })

    done()
  })

  it('should publish to Channel', (done) => {
    global.app.spools.pgpubsub.publish('test', 'test data')
    done()
  })

  it('should remove Channel', (done) => {
    global.app.spools.pgpubsub.removeChannel('test', 'test data')
    done()
  })
})
