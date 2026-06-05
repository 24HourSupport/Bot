import { z } from 'zod/mini'

export const NonEmptyString = z.string().check(z.minLength(1))
export type NonEmptyString = z.infer<typeof NonEmptyString>

export const Settings = z.looseObject({
  botToken: NonEmptyString
})
export type Settings = z.infer<typeof Settings>
