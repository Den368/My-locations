import React, { Component } from 'react'
import _ from 'lodash'
import style from './style.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import IconEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconCross from 'material-ui/svg-icons/content/clear'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Iframe from '../../components/Iframe'

class locationItem extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      open: false,
      openMap: false
    }
  }

  handleOpen () {
    window.navigator.vibrate(200)
    this.setState({open: true})
  }

  handleClose () {
    this.setState({open: false})
  }

  handleOpenMap () {
    this.setState({open: false, openMap: true})
  }

  handleCloseMap () {
    this.setState({openMap: false})
  }

  handleDelete () {
    const { actions, location } = this.props

    let locations = JSON.parse(window.localStorage.getItem('locations')) || []

    locations.splice(_.findIndex(locations, ['id', location.id]), 1)
    window.localStorage.setItem('locations', JSON.stringify(locations))
    actions.deleteLocation({'id': location.id})
  }



  renderMap () {
    const { location } = this.props
    const actions = [
      <FlatButton
        label='Ok'
        primary
        onTouchTap={() => this.handleCloseMap()}
      />
    ]
    return (
      <Dialog
        title={location.Name}
        actions={actions}
        modal={false}
        open={this.state.openMap}
        onRequestClose={() => this.handleCloseMap()}
      >
        <Iframe longitude={location.Coordinates ? location.Coordinates.longitude : null} latitude={location.Coordinates ? location.Coordinates.latitude : null} />
      </Dialog>
    )
  }

  renderDialog () {
    const { location } = this.props
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label='Show on map'
        primary
        keyboardFocused
        onTouchTap={() => this.handleOpenMap()}
      />
    ]
    return (
      <Dialog
        title={location.Name}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={() => this.handleClose()}
      >
        Address: {location.Address}<br />
        Coordinates: {JSON.stringify(location.Coordinates).replace(/[^a-zA-Z0-9:.,\s]/g, '')}<br />
        Category: {location.Category}
      </Dialog>
    )
  }

  render () {
    const { location } = this.props

    return (
      <li className={style.editing}>
        <MuiThemeProvider>
          <div>
            {this.renderDialog()}
            {this.renderMap()}
            <label onClick={() => this.handleOpen()}>
              {location.Name}
            </label>
            <div className={style.destroy}>
              <IconButton tooltip='Edit' onTouchTap={() => this.props.handleEdit(location)} >
                <IconEdit />
              </IconButton>
              <IconButton tooltip='Delete' onTouchTap={() => this.handleDelete()}>
                <IconCross />
              </IconButton>
            </div>
          </div>
        </MuiThemeProvider>
      </li>
    )
  }
}

export default locationItem
