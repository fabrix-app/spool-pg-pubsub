import joi from 'joi'
import { pgpubsubConfig } from './schemas'

export const Validator = {

  // Validate PgPubsub Config
  validatePgPubsubConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, pgpubsubConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.pgpubsub: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
