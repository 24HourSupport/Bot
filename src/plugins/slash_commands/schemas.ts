import { z } from 'zod/mini'

import { NonEmptyString } from '../../schemas'

export const Command = z.object({
  name: NonEmptyString,
  description: NonEmptyString,
  response: z.string(),
  imageAttachments: z.array(z.string().check(z.url())),
  videoAttachments: z.array(z.string().check(z.url()))
})
export type Command = z.infer<typeof Command>

export const Settings = z.object({
  slashCommands: z.object({
    admins: z.array(z.string()).check(z.minLength(1))
  })
})
export type Settings = z.infer<typeof Settings>
