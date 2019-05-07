import React from 'react'
import { Block } from '../block-wrapper'
import { ItemsPerPage } from '../items-per-page'
import { SearchPokemon } from '../search-pokemon'
import { TypesFilter } from '../types-filter'

function Header () {
  return (
    <React.Fragment>
      <Block>
        <h1 style={{ marginTop: '1rem' }}>Pokedex App</h1>
      </Block>
      <Block>
        <ItemsPerPage />
      </Block>
      <Block mobile={16} tablet={8} computer={8}>
        <SearchPokemon />
      </Block>
      <Block>
        <TypesFilter />
      </Block>
    </React.Fragment>
  )
}

export default Header
