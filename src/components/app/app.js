import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'
import { Container } from 'semantic-ui-react'

import { state } from '../../state'
import { PokemonList } from '../pokemon-list'
import { Header } from '../header'
import { Paginator } from '../pagination'

@observer
class App extends Component {
  componentDidMount () {
    state.getRawList()
  }

  render () {
    return (
      <Provider state={state}>
        <Container>
          <Header />
          <PokemonList />
          <Paginator />
        </Container>
      </Provider>
    )
  }
}

export default App
