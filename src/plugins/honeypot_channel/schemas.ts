import { z } from 'zod/mini'

const HoneypotEntry = z.object({
  honeypotChannel: z.string(),
  notifyChannel: z.string(),
  logChannel: z._default(z.nullable(z.string()), null),
  deleteMessageMinutes: z._default(z.number(), 60)
})
export type HoneypotEntry = z.infer<typeof HoneypotEntry>

export const Settings = z.object({
  honeypot: z.object({
    dryRun: z._default(z.boolean(), true),
    guilds: z.record(z.string(), HoneypotEntry)
  })
})
export type Settings = z.infer<typeof Settings>
