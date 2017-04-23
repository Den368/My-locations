
import React, { Component } from 'react'
import _ from 'lodash'
import LocationItem from '../LocationItem'
import CategoryItem from '../CategoryItem'
import CategorySection from '../CategorySection'
import LocationSection from '../../components/LocationSection'
import Footer from '../Footer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import style from './style.css'

class MainSection extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      manage: 'locations',
      editCategory: false,
      editLocation: false,
      editCategoryObj: null,
      editLocationObj: null,
      locationsGrouped: false,
      locationsSingleGrouped: false,
      locationsAlphabetic: false,
      categoryId: 0,
      categoryIndex: 0,
      open: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (!_.isEqual(newProps.categories, this.props.categories) || !_.isEqual(newProps.locations, this.props.locations)) {
      this.setState({editCategory: false, editLocation: false, editCategoryObj: null, editLocationObj: null})
    }
  }

  renderGroup (groupName, items) {
    const { locationsActions } = this.props

    return items ? (
      <div>
        <h3>Category: {groupName}</h3>
        <ul className={style.normal}>
          {items.map(location => <LocationItem key={location.id}
            location={location}
            handleEdit={(location) => this.setState({editLocation: true, editLocationObj: location})}
            actions={locationsActions} />
          )}
        </ul>
      </div>
    ) : null
  }

  handleOpen () {
    this.setState({open: true})
  }

  handleClose () {
    this.setState({open: false})
  }

  renderDialog () {
    const { categories } = this.props
    const actions = [
      <FlatButton
        label='Ok'
        primary
        onTouchTap={() => this.handleClose()}
      />
    ]
    return (
      <Dialog
        title={'Choose category'}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={() => this.handleClose()}
      >
        <SelectField
          floatingLabelText='Category'
          value={this.state.categoryId}
          onChange={this.handleChange.bind(this)}
        >
          {categories.map(category =>
            category.id === 0 ? null : <MenuItem value={category.id} key={category.id} primaryText={category.Name} />
          )}
        </SelectField>
      </Dialog>
    )
  }

  renderGrouped () {
    const { locations, categories } = this.props
    const { categoryIndex, locationsSingleGrouped } = this.state

    let groupedLocs = _.groupBy(locations, 'Category')
    let categoryName = categories[categoryIndex].Name

    return !locationsSingleGrouped ? (
      <div>
        {Object.keys(groupedLocs).map((key, index) => key !== 'default' ? this.renderGroup(key, groupedLocs[key]) : null)}
      </div>
    ) : (
      <div>
        {categoryName ? this.renderGroup(categoryName, groupedLocs[categoryName]) : null}
      </div>
    )
  }

  handleChange (event, index, categoryId) {
    this.setState({categoryId, categoryIndex: index, locationsGrouped: true, locationsSingleGrouped: true, open: false})
  }

  renderLocations () {
    const { locations, locationsActions } = this.props
    const { locationsGrouped, locationsAlphabetic } = this.state
    let locs = locationsAlphabetic ? _.sortBy(locations, ['Name']) : locations

    return (
      <div>
        {locationsGrouped ? this.renderGrouped() : <ul className={style.normal}>
          {
            locs.map(location => location.id === 0 ? null : <LocationItem key={location.id}
              location={location}
              handleEdit={(location) => this.setState({editLocation: true, editLocationObj: location})}
              actions={locationsActions} />
            )
          }
        </ul>
        } <br />
        <MuiThemeProvider>
          <div>
            { this.renderDialog() }
            <RaisedButton
              label='Add more'
              primary
              icon={<AddIcon />}
              style={{width: '100%'}}
              onTouchTap={() => this.setState({editLocation: true})}
            />
            <RaisedButton
              label='Press here to see sorted locations by alphabetical order'
              style={{width: '100%'}}
              onTouchTap={() => this.setState({locationsAlphabetic: !this.state.locationsAlphabetic, locationsGrouped: false})}
            />
            <RaisedButton
              label='Press here to group/ungroup locations by categories'
              style={{width: '100%'}}
              onTouchTap={() => this.setState({locationsGrouped: !this.state.locationsGrouped, locationsSingleGrouped: false})}
            />
            <RaisedButton
              label='Press here to choose a specific category'
              style={{width: '100%'}}
              onTouchTap={() => this.handleOpen()}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

  renderCategories () {
    const { categories, categoryActions } = this.props
    return (
      <div>
        <ul className={style.normal}>
          {categories.map(category =>
            category.id === 0 ? null : <CategoryItem key={category.id}
              category={category}
              handleEdit={(cat) => this.setState({editCategory: true, editCategoryObj: category})}
              actions={categoryActions} />
          )}
        </ul><br />
        <MuiThemeProvider>
          <RaisedButton
            label='Add more'
            primary
            icon={<AddIcon />}
            style={{width: '100%'}}
            onTouchTap={() => this.setState({editCategory: true})}
          />
        </MuiThemeProvider>
      </div>
    )
  }

  handleCancel () {
    this.setState({editCategory: false, editLocation: false})
  }

  renderEditCategory () {
    const { categories, categoryActions } = this.props
    const { editCategoryObj } = this.state

    return (
      <div>
        <CategorySection
          actions={categoryActions}
          categories={categories}
          isEditing={!!editCategoryObj}
          category={editCategoryObj}
          handleCancel={() => this.handleCancel()} />
      </div>
    )
  }

  renderEditLocation () {
    const { categories, locationsActions, locations } = this.props
    const { editLocationObj } = this.state

    return (
      <div>
        <LocationSection
          categories={categories}
          locations={locations}
          actions={locationsActions}
          isEditing={!!editLocationObj}
          location={editLocationObj}
          handleCancel={() => this.handleCancel()} />
      </div>
    )
  }

  handleEntitySelection (entityIndex) {
    this.setState({manage: entityIndex === 0 ? 'locations' : 'categories', editCategory: false, editLocation: false, editCategoryObj: null, editLocationObj: null})
  }

  renderFooter () {
    const { manage } = this.state

    return (
      <Footer selectedIndex={manage === 'locations' ? 0 : 1} handleEntitySelection={this.handleEntitySelection.bind(this)} />
    )
  }

  render () {
    const { manage, editCategory, editLocation } = this.state

    return (
      <section className={style.main}>
        { !editCategory && !editLocation ? manage === 'locations' ? this.renderLocations() : this.renderCategories() : null }
        { editCategory ? this.renderEditCategory() : null }
        { editLocation ? this.renderEditLocation() : null }
        {this.renderFooter()}
      </section>
    )
  }
}

export default MainSection
