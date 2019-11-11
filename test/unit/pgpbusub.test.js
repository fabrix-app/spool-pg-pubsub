'use strict'
/* global describe, it */
const assert = require('assert')

const fun = function(payload) {

}

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
    global.app.spools.pgpubsub.addChannel('test', fun)

    done()
  })

  it('should publish to Channel', (done) => {
    global.app.spools.pgpubsub.publish('test', 'test data')
    done()
  })

  it('should remove Channel', (done) => {
    global.app.spools.pgpubsub.removeChannel('test', fun)
    done()
  })


  it('should subscribe to Channel', (done) => {
    const fun2 = function(payload) {
      console.log('brk payload', payload)
      done()
    }

    global.app.spools.pgpubsub.subscribe('test', fun2)
    global.app.spools.pgpubsub.publish('test', { hello: 'world' })
  })

  it('should subscribe to Channel', (done) => {
    const fun2 = function(payload) {
      const err = new Error('SHOULD NOT HAVE BEEN SUBSCRIBED')
      done(err)
    }

    global.app.spools.pgpubsub.subscribe('test', fun2)
    global.app.spools.pgpubsub.unsubscribe('test', fun2)
    global.app.spools.pgpubsub.publish('test', { hello: 'world' })

    setTimeout(function() {
      done()
    },100)

  })
})
