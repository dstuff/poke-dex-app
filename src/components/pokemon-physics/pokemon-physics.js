import React from 'react'
import { Icon } from 'semantic-ui-react'

import './pokemon-physics.css'

export default function PokemonPhysics (props) {
  const { height = 0, weight = 0 } = props
  return (
    <div className='pokemon-physics'>
      <div className='physics-item'>
        <Icon name='arrows alternate vertical' />{height * 10} cm
      </div>
      <div className='physics-item'>
        <Icon name='weight' />{(weight * 100) / 1000} kg
      </div>
    </div>
  )
}
