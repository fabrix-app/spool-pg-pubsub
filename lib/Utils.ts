import { FabrixApp } from '@fabrix/fabrix'
import pgListen, { PgParsedNotification } from 'pg-listen'

export const Utils = {
  /**
   * Create the Stores
   */

  configure: (app: FabrixApp) => {
    const subscriber = pgListen({ connectionString: app.config.get('pgpubsub.uri') })

    subscriber.events.on('error', (error) => {
      console.error('Fatal database connection error:', error)
      // process.exit(1)
    })

    // Prepares connections awaiting "connect"
    app.spools.pgpubsub._pgpubsub = subscriber

    // Adds a handler function to all notifications
    app.spools.pgpubsub._pgpubsub.events.on(
      'notification',
      (notification: PgParsedNotification) => Utils.handler(app, notification)
    )

    // Logs out errors
    app.spools.pgpubsub._pgpubsub.events.on(
      'error',
      (err) => {
        app.log.error(err)
      }
    )

    // Logs out errors
    app.spools.pgpubsub._pgpubsub.events.on(
      'connected',
      () => {
        app.log.debug('PgPubsub connected')
      }
    )

    // Logs out errors
    app.spools.pgpubsub._pgpubsub.events.on(
      'disconnected',
      () => {
        app.log.debug('PgPubsub disconnected')
      }
    )

    return Promise.resolve()
  },

  init: (app: FabrixApp): Promise<void> => {
    return app.spools.pgpubsub._pgpubsub.connect()
  },

  /**
   * Unload the Stores
   */
  unload: (app: FabrixApp): Promise<void> => {
    return app.spools.pgpubsub._pgpubsub.close()
  },

  listChannels(app: FabrixApp): string[] {
    return app.spools.pgpubsub._pgpubsub.getSubscribedChannels()
  },

  /**
   * Runs the Handlers once the channel is reached
   * @param app
   * @param notification
   */
  handler(app: FabrixApp, notification) {
    // channel: "test",
    // payload: { hello: "world" },
    // processId: notifications[0].processId
    if (app.spools.pgpubsub.subscribers.has(notification.channel)) {
      Array.from(app.spools.pgpubsub.subscribers.get(notification.channel).values()).forEach((fn: any) => {
        //
        try {
          fn(notification.payload)
        }
        catch (err) {
          app.log.error(err)
        }
      })
    }
  },

  addChannel(app: FabrixApp, channelName, fn): Map<string, Map<string, any>> {
    const name = fn.name

    if (app.spools.pgpubsub.subscribers.has(channelName)) {
      //
      if (app.spools.pgpubsub.subscribers.get(channelName).has(name)) {
        // do nothing
      }
      else {
        app.spools.pgpubsub.subscribers.get(channelName).set(name, fn)
      }
    }
    else {
      app.spools.pgpubsub.subscribers.set(channelName, new Map([[name, fn]]))
    }

    return app.spools.pgpubsub.subscribers.get(channelName)
  },

  removeChannel(app: FabrixApp, channelName, name): Map<string, Map<string, any>> {
    // Make sure we use the name as a string
    name = typeof name !== 'string' ? name.name : name

    // return app.spools.pgpubsub._pgpubsub.removeChannel(channelName)
    if (app.spools.pgpubsub.subscribers.has(channelName)) {
      //
      if (app.spools.pgpubsub.subscribers.get(channelName).has(name)) {
        app.spools.pgpubsub.subscribers.get(channelName).delete(name)
      }
    }
    return app.spools.pgpubsub.subscribers.get(channelName)
  },

  publish(app: FabrixApp, channelName, data): Promise<any> {
    return app.spools.pgpubsub._pgpubsub.notify(channelName, data)
  },

  subscribe(app: FabrixApp, channelName, fn): Promise<any> {
    const channels = Utils.listChannels(app)

    if (channels.includes(channelName)) {
      Utils.addChannel(app, channelName, fn)
      return Promise.resolve()
    }
    else {
      Utils.addChannel(app, channelName, fn)
      return app.spools.pgpubsub._pgpubsub.listenTo(channelName)
    }
    // app.spools.pgpubsub.subscribers.add(channelName)
    // return app.spools.pgpubsub._pgpubsub.once(channelName, fn)
  },

  unsubscribe(app: FabrixApp, channelName, name) {
    const channels = Utils.listChannels(app)

    if (channels.includes(channelName)) {
      Utils.removeChannel(app, channelName, name)
      return app.spools.pgpubsub._pgpubsub.unlisten(channelName)
    }
    else {
      Utils.removeChannel(app, channelName, name)
      return Promise.resolve()
    }
  }
}
