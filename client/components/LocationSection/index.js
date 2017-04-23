
import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import _ from 'lodash'
import style from './style.css'

class LocationSection extends Component {
  constructor (props, context) {
    super(props, context)
    let categoryId = 0
    let categoryIndex = 0
    if (props.location && props.categories) {
      categoryIndex = _.findIndex(props.categories, ['Name', props.location.Category])
      categoryId = props.categories.length - 1 - categoryIndex
    }
    this.state = {
      id: props.location ? props.location.id || 0 : 0,
      name: props.location ? props.location.Name || '' : '',
      address: props.location ? props.location.Address || '' : '',
      longitude: props.location && props.location.Coordinates ? props.location.Coordinates.longitude || '' : '',
      latitude: props.location && props.location.Coordinates ? props.location.Coordinates.latitude || '' : '',
      categoryIndex: categoryIndex,
      categoryId: categoryId,
      validName: true,
      validAddress: true,
      validlongitude: true,
      validLatitude: true,
      validCategory: true
    }
  }

  handleChange (event, index, categoryId) {
    this.setState({categoryId, categoryIndex: index, validCategory: true})
  }

  handleSave () {
    const { actions, isEditing, categories, location, locations } = this.props
    const { name, address, longitude, latitude, categoryId, categoryIndex } = this.state
    if (categoryId === 0) {
      return this.setState({validCategory: false})
    }
    let categoryName = categories[categoryIndex].Name
    let locationItem = {'Name': name, 'Address': address, 'Coordinates': {'longitude': longitude, 'latitude': latitude}, 'Category': categoryName}
    let localLocations = JSON.parse(window.localStorage.getItem('locations')) || []

    if (isEditing) {
      let indexToEdit = _.findIndex(localLocations, ['id', location.id])
      actions.editLocation(Object.assign({'id': location.id}, locationItem))
      localLocations[indexToEdit] = Object.assign({'id': location.id}, locationItem)
    } else {
      actions.addLocation(locationItem)
      localLocations.push(Object.assign({'id': locations.reduce((maxId, location) => Math.max(location.id, maxId), -1) + 1}, locationItem))
    }
    window.localStorage.setItem('locations', JSON.stringify(localLocations))
  }

  handleChangeName (text) {
    text.target.value.length > 0 ? this.setState({ name: text.target.value, validName: true }) : this.setState({ name: text.target.value, validName: false })
  }

  handleChangeAddress (text) {
    text.target.value.length > 0 ? this.setState({ address: text.target.value, validAddress: true }) : this.setState({ address: text.target.value, validAddress: false })
  }

  handleChangelongitude (text) {
    text.target.value.length > 0 && new RegExp('^(([0-9]*)|(([0-9]*)\\.([0-9]*)))$').test(text.target.value) ? this.setState({ longitude: text.target.value, validlongitude: true }) : this.setState({ longitude: text.target.value, validlongitude: false })
  }

  handleChangeLatitude (text) {
    text.target.value.length > 0 && new RegExp('^(([0-9]*)|(([0-9]*)\\.([0-9]*)))$').test(text.target.value) ? this.setState({ latitude: text.target.value, validLatitude: true }) : this.setState({ latitude: text.target.value, validLatitude: false })
  }

  render () {
    const { categories } = this.props
    const { validName, validAddress, validlongitude, validLatitude, validCategory } = this.state

    return (
      <section className={style.main}>
        <MuiThemeProvider>
          <div>
            <TextField
              id='Name'
              floatingLabelText='Location name:'
              errorText={validName ? '' : 'wrong name'}
              value={this.state.name}
              onChange={this.handleChangeName.bind(this)}
            /> <br />
            <TextField
              id='Address'
              floatingLabelText='Address:'
              errorText={validAddress ? '' : 'wrong Address'}
              value={this.state.address}
              onChange={this.handleChangeAddress.bind(this)}
            /> <br />
            <h4> {'Enter Coordinates: '}</h4>
            <TextField
              id='longitude'
              floatingLabelText='longitude'
              errorText={validlongitude ? '' : 'wrong longitude'}
              value={this.state.longitude}
              onChange={this.handleChangelongitude.bind(this)}
            />
            <TextField
              id='latitude'
              floatingLabelText='latitude'
              errorText={validLatitude ? '' : 'wrong latitude'}
              value={this.state.latitude}
              onChange={this.handleChangeLatitude.bind(this)}
            /> <br />
            <SelectField
              floatingLabelText='Category'
              value={this.state.categoryId}
              onChange={this.handleChange.bind(this)}
            >
              {categories.map(category =>
                category.id === 0 ? null : <MenuItem value={category.id} key={category.id} primaryText={category.Name} />
              )}
            </SelectField><br />
            {!validCategory ? <label style={{color: 'red'}}>{'wrong category'}</label> : null}
            <br />
            <RaisedButton label='Save' primary onClick={this.handleSave.bind(this)} />
            <RaisedButton label='Cancel' onClick={this.props.handleCancel} />
          </div>
        </MuiThemeProvider>
      </section>
    )
  }
}

// Defaults for props
LocationSection.defaultProps = {
  isEditing: false
}

export default LocationSection
