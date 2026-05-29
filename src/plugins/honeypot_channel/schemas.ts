import { z } from 'zod'

const HoneypotEntry = z.object({
  honeypotChannel: z.string(),
  notifyChannel: z.string()
})
export type HoneypotEntry = z.infer<typeof HoneypotEntry>

export const Settings = z.object({
  honeypot: z.object({
    dryRun: z.boolean().default(true),
    guilds: z.record(z.string(), HoneypotEntry)
  })
})
export type Settings = z.infer<typeof Settings>
