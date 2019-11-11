import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { Utils } from './Utils'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class PgPubsubSpool extends ExtensionSpool {
  // public pgpubsub
  private _pgpubsub

  public subscribers = new Map([])

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      pgpubsub: {
        get: () => {
          return this.pgpubsub
        },
        set: (newInstances) => {
          throw new Error('pgpubsub can not be set through FabrixApp, check spool-pgpubsub instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  get pgpubsub() {
    return this._pgpubsub
  }

  addChannel(name, fn) {
    return Utils.addChannel(this.app, name, fn)
  }

  removeChannel(channel, fnName) {
    return Utils.removeChannel(this.app, channel, fnName)
  }

  async publish(name, data) {
    return Utils.publish(this.app, name, data)
  }

  subscribe(name, fn) {
    return Utils.subscribe(this.app, name, fn)
  }

  unsubscribe(channel, fnName) {
    return Utils.unsubscribe(this.app, channel, fnName)
  }

  /**
   * Validate Configuration
   */
  async validate () {
    // const requiredSpools = [ ]
    // const spools = Object.keys(this.app.spools)
    //
    // if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
    //   return Promise.reject(new Error(`spool-pgpubsub requires spools: ${ requiredSpools.join(', ') }!`))
    // }

    if (!this.app.config.get('pgpubsub')) {
      return Promise.reject(new Error('No configuration found at config.pgpubsub!'))
    }

    return Promise.all([
      Validator.validatePgPubsubConfig(this.app.config.get('pgpubsub'))
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * Check if there some stores, if not set a default one
   */
  async configure() {
    return Utils.configure(this.app)
  }

  /**
   * create caching stores
   */
  async initialize() {
    return Utils.init(this.app)
  }

  /**
   * unload caching stores
   */
  async unload() {
    return Utils.unload(this.app)
  }
}
