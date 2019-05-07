import React from 'react'

function PokemonImage ({ imgSrc = '' }) {
  return (
    <img
      src={imgSrc}
      width='96'
      height='96'
      alt=''
    />
  )
}

export default PokemonImage
