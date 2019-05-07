import React from 'react'
import { List } from 'semantic-ui-react'
import { capitalizeLetter } from '../../utils/capitalizeLetter'

function PokemonStats ({ stats = [] }) {
  const properties = stats.map(item => {
    return {
      name: item.stat.name,
      value: item.base_stat
    }
  })
  return (
    <List>
      {properties.map((stat, i) => {
        return (
          <List.Item key={i}>
            {capitalizeLetter(stat.name)}: {stat.value}
          </List.Item>
        )
      })}
    </List>
  )
}

export default PokemonStats
