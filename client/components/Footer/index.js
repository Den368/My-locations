import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import IconStorage from 'material-ui/svg-icons/device/storage'

const locationsIcon = <IconLocationOn />
const categoryIcon = <IconStorage />

class Footer extends Component {
  render () {
    const { handleEntitySelection, selectedIndex } = this.props
    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={selectedIndex}>
            <BottomNavigationItem
              label='Locations'
              icon={locationsIcon}
              onTouchTap={() => handleEntitySelection(0)}
            />
            <BottomNavigationItem
              label='Categories'
              icon={categoryIcon}
              onTouchTap={() => handleEntitySelection(1)}
            />
          </BottomNavigation>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default Footer
