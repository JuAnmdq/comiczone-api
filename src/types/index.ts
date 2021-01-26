import { Request } from 'express'

export interface Credentials {
  _id: string
  username: string
  password: string
}

export interface VerifyRequest extends Request {
  accessToken?: string
}
