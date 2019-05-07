import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Grid, Loader } from 'semantic-ui-react'
import { ListItem } from '../list-item'

@inject('state')
@observer
class PokemonList extends Component {
  componentDidMount () {
    this.props.state.filterItems()
  }

  render () {
    const {
      renderList,
      loading,
      toggleFavorite,
      favorites
    } = this.props.state
    if (loading) {
      return (
        <Loader active={loading} />
      )
    }
    const listComponent = renderList.length
      ? (renderList.map((item) => {
        return (
          <ListItem
            key={item.id}
            data={item}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(item.id)}
          />
        )
      })) : (
        <Grid.Column>
          <h2>Nothing Found</h2>
        </Grid.Column>
      )

    return (
      <Grid>
        {listComponent}
      </Grid>
    )
  }
}

export default PokemonList
