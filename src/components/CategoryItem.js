import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import categories from '../utils/categories.json'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dad',
    alignItems: 'center',
    justifyContent: 'center'
  },
  full: {
    width: '100%',
    height: '100%',
    backgroundColor: 'magenta',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullWidthButton: {
    width: '90%',
    height: '90%',
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'white'
  }
})

class CategoryItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      items: categories.data
      .filter(category => category.type === this.props.type)
      .map(category => category.text),
      currentText: this.props.type,
      interval: null
    }
  }

  openCategory () {
    let currentText = this.state.isOpen ? this.props.type : this.getRandomItem()
    let interval = null
    if (!this.state.isOpen) {
      interval = setInterval(() => {
        console.log('change text', this.state.items.length)
        if (this.state.items.length) {
          let randomText = this.getRandomItem()
          let items = this.state.items.filter(item => item !== randomText)
          this.setState({ currentText: randomText, items })
        } else {
          clearInterval(this.state.interval)
          this.setState({
            isOpen: false,
            currentText: this.props.type,
            items: categories.data.filter(category => category.type === this.props.type).map(category => category.text)
          })
        }
      }, 3000)
    } else {
      clearInterval(this.state.interval)
    }
    this.setState({ isOpen: !this.state.isOpen, currentText, interval })
  }

  getRandomItem () {
    return this.state.items[Math.floor(Math.random() * this.state.items.length)]
  }

  render () {
    let { isOpen, currentText } = this.state
    return (
      <View style={isOpen ? styles.full : styles.container}>
        {
          <TouchableHighlight style={styles.fullWidthButton} onPress={this.openCategory.bind(this)}>
            <Text style={styles.fullWidthButtonText}>{currentText}</Text>
          </TouchableHighlight>
        }
      </View>
    )
  }
}

export default CategoryItem
