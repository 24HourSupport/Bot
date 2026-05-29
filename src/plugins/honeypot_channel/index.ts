import { Settings, type HoneypotEntry } from './schemas'
import type { Plugin } from '../../types'
import {
  channelMention,
  type Message,
  PermissionsBitField,
  userMention
} from 'discord.js'
import { logError } from '../../logger'

function loadSettings(settings: unknown): Settings | null {
  const result = Settings.safeParse(settings)
  if (!result.success) console.error(JSON.stringify(result.error.format()))
  return result.success ? result.data : null
}

async function banAndNotify(
  message: Message<true>,
  config: HoneypotEntry,
  dryRun: boolean
) {
  const member = await message.guild.members.fetch(message.author)

  let harmless = false
  harmless ||= dryRun
  harmless ||= member.permissions.any([
    PermissionsBitField.Flags.ManageMessages,
    PermissionsBitField.Flags.Administrator
  ])

  if (!harmless) {
    await member.ban({
      reason: 'Posted in honeypot channel',
      deleteMessageSeconds: 60 * 5
    })
  }

  const notifyChannel = await message.client.channels.fetch(
    config.notifyChannel
  )
  if (!notifyChannel || !notifyChannel.isTextBased()) return
  await notifyChannel.send(
    harmless
      ? `Not banning ${userMention(member.id)}  for posting in ${channelMention(
          message.channelId
        )}. Either dry run is on, or they have admin-like permissions`
      : `Banned user ${userMention(
          message.author.id
        )} for posting in ${channelMention(message.channelId)}`
  )
}

const name = 'HoneypotChannel'

const init: Plugin['init'] = (client, generalSettings) => {
  const settings = loadSettings(generalSettings)
  if (!settings) {
    logError(
      `${name}:`,
      'Settings malformed, not checking for honeypot channels!'
    )
    return
  }

  client.on('messageCreate', async (message) => {
    if (!message.inGuild()) return

    const configForGuild = settings.honeypot.guilds[message.guildId]
    if (!configForGuild) return

    if (message.channelId !== configForGuild.honeypotChannel) return

    await banAndNotify(message, configForGuild, settings.honeypot.dryRun)
  })
}

export default { name, init }
