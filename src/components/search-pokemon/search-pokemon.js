import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form } from 'semantic-ui-react'
import { debounce } from '../../utils/debounce'

import './search-pokemon.css'

@inject('state')
@observer
class SearchPokemon extends Component {
  searchItems = (e, { value }) => {
    e.persist()
    const { filterItems, updateSearchFilter } = this.props.state
    updateSearchFilter(value)
    filterItems()
  }

  resetForm = () => {
    const { updateSearchFilter, filterItems } = this.props.state
    updateSearchFilter()
    filterItems()
  }

  onSearchChange = debounce(this.searchItems, 750)

  render () {
    return (
      <Form className='search-form'>
        <Form.Input
          icon='search'
          iconPosition='left'
          placeholder='Type a pokemon name...'
          size='large'
          onChange={this.onSearchChange}
        />
        <Form.Button
          size='large'
          type='reset'
          onClick={this.resetForm}
        >
          Clear Search
        </Form.Button>
      </Form>
    )
  }
}

export default SearchPokemon
