import React from 'react'
import { Grid } from 'semantic-ui-react'

const Block = (props) => {
  return (
    <Grid>
      <Grid.Column
        {...props}
      >
        {props.children}
      </Grid.Column>
    </Grid>
  )
}

export default Block
