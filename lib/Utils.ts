import { FabrixApp } from '@fabrix/fabrix'
import PGPubsub from 'pg-pubsub'

export const Utils = {
  /**
   * Create the Stores
   */

  init: (app: FabrixApp) => {
    // init pgpubsub server
    const instance = new PGPubsub(app.config.get('pgpubsub.uri'), app.config.get('pgpubsub.options'))

    // Prepares connections awaiting "add channel"
    app.spools.pgpubsub._pgpubsub = instance

    return Promise.resolve()
  },

  /**
   * Unload the Stores
   */
  unload: (app: FabrixApp) => {
    return app.spools.pgpubsub._pgpubsub.close()
  },

  addChannel(app: FabrixApp, channelName, fn) {
    return app.spools.pgpubsub._pgpubsub.addChannel(channelName, fn)
  },

  removeChannel(app: FabrixApp, channelName) {
    return app.spools.pgpubsub._pgpubsub.removeChannel(channelName)
  },

  publish(app: FabrixApp, channelName, data) {
    return app.spools.pgpubsub._pgpubsub.publish(channelName, data)
  },

  subscribe(app: FabrixApp, channelName, fn) {
    app.spools.pgpubsub.subscribers.add(channelName)
    return app.spools.pgpubsub._pgpubsub.once(channelName, fn)
  },

  unsubscribe(app: FabrixApp, channelName) {
    app.spools.pgpubsub.subscribers.delete(channelName)
    return app.spools.pgpubsub._pgpubsub.removeEventListener(channelName)
  }
}
