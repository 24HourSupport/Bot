import type { Plugin } from '../types'

import activity from './activity/index'
import slash_commands from './slash_commands/index'
import honeypot from './honeypot_channel'

const enabledPlugins: Plugin[] = [activity, slash_commands, honeypot]

export default enabledPlugins
