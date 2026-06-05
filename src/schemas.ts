import { z } from 'zod'

export const NonEmptyString = z.string().min(1)
export type NonEmptyString = z.infer<typeof NonEmptyString>

export const Settings = z
  .object({
    botToken: NonEmptyString
  })
  .loose()
export type Settings = z.infer<typeof Settings>
