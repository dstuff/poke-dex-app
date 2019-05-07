import React from 'react'
import { Label } from 'semantic-ui-react'

import './pokemon-types.css'

function PokemonTypes ({ types }) {
  return (
    <div className='pokemon-type'>
      {types.map((item) => {
        return (
          <Label color='teal' key={item.slot}>
            {item.type.name}
          </Label>
        )
      })}
    </div>
  )
}

export default PokemonTypes
