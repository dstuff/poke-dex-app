import React from 'react'
import { Grid, Label, Icon } from 'semantic-ui-react'
import { PokemonImage } from '../pokemon-image'
import { PokemonPhysics } from '../pokemon-physics'
import { PokemonTypes } from '../pokemon-types'
import { PokemonStats } from '../pokemon-stats'

import './list-item.css'

function ListItem (props) {
  const {
    data = {},
    toggleFavorite = () => {},
    isFavorite = false
  } = props
  return (
    <Grid.Column className='item-container'>
      <Label
        attached='top right'
        as='a'
        color={isFavorite ? 'orange' : null}
        size='large'
        onClick={() => toggleFavorite(data.id)}
      >
        <Icon name={isFavorite ? 'star' : 'star outline'} />
      </Label>
      <PokemonImage imgSrc={data.sprites && data.sprites.front_default} />
      <h2>{data.name}</h2>
      <PokemonTypes types={data.types} />
      <PokemonPhysics weight={data.weight} height={data.height} />
      <PokemonStats stats={data.stats} />
    </Grid.Column>
  )
}

export default ListItem
