import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CategoryItem from './src/components/CategoryItem'
import categories from './src/utils/categories.json'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        {
          Object.keys(categories.data.reduce((rv, x) => {
            (rv[x['type']] = rv[x['type']] || []).push(x)
            return rv
          }, {}))
          .map(type => <CategoryItem key={type} type={type}>{type}</CategoryItem>)
        }
      </View>
    )
  }
}
