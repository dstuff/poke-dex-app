import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Label, List } from 'semantic-ui-react'

const ITEMS_PER_PAGE = [10, 20, 50]

@inject('state')
@observer
class ItemsPerPage extends Component {
  changePerPage = (count) => {
    const { onPerPageChange, perPage } = this.props.state
    // we shouldn't make request if perPage didn't change
    if (count === perPage) return null
    onPerPageChange(count)
  };

  render () {
    const { state: { perPage } } = this.props
    return (
      <List horizontal>
        <List.Item key='title'>
          <h3>Items per page: </h3>
        </List.Item>
        {
          ITEMS_PER_PAGE.map(count => {
            return (
              <List.Item key={count}>
                <Label
                  color={perPage === count ? 'orange' : null}
                  as={perPage === count ? 'label' : 'a'}
                  size='large'
                  onClick={() => this.changePerPage(count)}>
                  {count}
                </Label>
              </List.Item>
            )
          })
        }
      </List>
    )
  }
}

export default ItemsPerPage
