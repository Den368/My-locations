
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as CategoryActions from '../../actions/category'
import * as LocationsActions from '../../actions/locations'

// Styles
import style from './style.css'

class App extends Component {
  constructor (props, context) {
    super(props, context)
    let categories = JSON.parse(window.localStorage.getItem('categories')) || []
    categories.map((item) => { props.categoryActions.addCategory(item) })
    let locations = JSON.parse(window.localStorage.getItem('locations')) || []
    locations.map((item) => { props.locationsActions.addLocation(item) })
  }


  render () {
    const { categoryActions, locationsActions, children, locations, categories } = this.props

    return (
      <div className={style.normal}>
        <Header addTodo={categoryActions.addCategory} />
        <MainSection locations={locations} categories={categories} categoryActions={categoryActions} locationsActions={locationsActions} />
        {children}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    locations: state.locations,
    categories: state.category
  }
}

function mapDispatchToProps (dispatch) {
  return {
    categoryActions: bindActionCreators(CategoryActions, dispatch),
    locationsActions: bindActionCreators(LocationsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
