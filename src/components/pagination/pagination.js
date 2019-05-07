import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Pagination } from 'semantic-ui-react'
import { Block } from '../block-wrapper'

import './pagination.css'

@inject('state')
@observer
class Paginator extends Component {
  onPageChange = (e, { activePage }) => {
    e.preventDefault()
    const { onPageChange } = this.props.state
    onPageChange(activePage)
  };

  render () {
    const {
      currentPage,
      totalPages,
      renderList
    } = this.props.state
    return (
      <Block textAlign="center" mobile={16}>
        {
          totalPages > 1 && renderList.length ? (
            <Pagination
              activePage={currentPage}
              onPageChange={this.onPageChange}
              totalPages={totalPages}
            />
          ) : null
        }
      </Block>
    )
  }
}

export default Paginator
