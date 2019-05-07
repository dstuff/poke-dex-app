import React, { Component } from 'react'
import { List, Label } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react'

import './types-filter.css'

@inject('state')
@observer
class TypesFilter extends Component {
  filterByType = (e, { children: type }) => {
    e.preventDefault()
    const { toggleType } = this.props.state
    toggleType(type)
  }

  resetTypeFilter = () => {
    const { filters: { types }, resetTypeFilter } = this.props.state
    if (!types.length) return null
    resetTypeFilter()
  }

  render () {
    const {
      filters: {
        types: typeList
      },
      pokemonTypes
    } = this.props.state
    return (
      <React.Fragment>
        <h3>Pokemon Type</h3>
        <List horizontal className='types-list'>
          {
            pokemonTypes.map((item) => {
              return (
                <List.Item key={item.name}>
                  <Label
                    as='a'
                    size='large'
                    onClick={this.filterByType}
                    color={typeList.includes(item.name) ? 'orange' : null}>
                    {item.name}
                  </Label>
                </List.Item>
              )
            })
          }
          <List.Item key='clear-all'>
            <Label
              as='a'
              onClick={this.resetTypeFilter}
              color='grey'
              size='large'
            >
            Reset Type
            </Label>
          </List.Item>
        </List>
      </React.Fragment>
    )
  }
}

export default TypesFilter
