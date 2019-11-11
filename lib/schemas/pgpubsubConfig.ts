import joi from 'joi'

export const pgpubsubConfig = joi.object().keys({
  uri: joi.string().allow(null, ''),
  options: joi.object()
}).unknown()
