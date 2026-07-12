import { type SchemaTypeDefinition } from 'sanity'
import season from './season'
import match from './match'
import club from './club'
import sponsor from './sponsor'
import player from './player'
import staff from './staff'
import news from './news'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [season, club, match, sponsor, player, staff, news],
}