
import React, { Component } from 'react'
import _ from 'lodash'
import style from './style.css'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import IconEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconCross from 'material-ui/svg-icons/content/clear'

class CategoryItem extends Component {
  handleDelete () {
    const { actions, category } = this.props

    let categories = JSON.parse(window.localStorage.getItem('categories')) || []

    categories.splice(_.findIndex(categories, ['Name', category.Name]), 1)
    window.localStorage.setItem('categories', JSON.stringify(categories))
    actions.deleteCategory({'Name': category.Name})
  }

  render () {
    const { category } = this.props

    return (
      <li className={style.editing}>
        <MuiThemeProvider>
          <div>
            <label>
              {category.Name}
            </label>
            <div className={style.destroy}>
              <IconButton tooltip='Edit' onTouchTap={() => this.props.handleEdit(category)} >
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

export default CategoryItem
