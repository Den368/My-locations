
import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'
import style from './style.css'

class CategorySection extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      name: props.category ? props.category.Name || '' : '',
      validName: true
    }
  }

  handleSave () {
    const { actions, isEditing, categories } = this.props
    let localCategories = JSON.parse(window.localStorage.getItem('categories')) || []
    let index = _.findIndex(localCategories, ['Name', this.state.name])
    if (index < 0) {
      if (isEditing) {
        let indexToEdit = _.findIndex(localCategories, ['Name', this.props.category.Name])
        actions.editCategory({'id': this.props.category.id, 'Name': this.state.name})
        localCategories[indexToEdit].Name = this.state.name
      } else {
        actions.addCategory({'Name': this.state.name})
        localCategories.push({'id': categories.reduce((maxId, location) => Math.max(location.id, maxId), -1) + 1, 'Name': this.state.name})
      }
      window.localStorage.setItem('categories', JSON.stringify(localCategories))
    } else {
      this.setState({ validName: false })
    }
  }

  handleChange (text) {
    text.target.value.length > 0 ? this.setState({ name: text.target.value, validName: true }) : this.setState({ name: text.target.value, validName: false })
  }

  render () {
    const { validName } = this.state

    return (
      <section className={style.main}>
        <MuiThemeProvider>
          <div>
            <TextField
              id='Name'
              floatingLabelText='Category name:'
              errorText={validName ? '' : 'wrong name or already in use'}
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            /> <br />
            <RaisedButton label='Save' primary onClick={this.handleSave.bind(this)} />
            <RaisedButton label='Cancel' onClick={this.props.handleCancel} />
          </div>
        </MuiThemeProvider>
      </section>
    )
  }
}

// Defaults for props
CategorySection.defaultProps = {
  isEditing: false
}

export default CategorySection
