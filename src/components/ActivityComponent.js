import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const ActivityComponent = ({children, cargando}) => {
  if (cargando) {
    return (
      <View style={styles.indicadorCargando}>
        <ActivityIndicator
          animating={true}
          color={'#be2e4a'}
          style={{flex: 1}}
        />
        {children}
      </View>
    )
  } else {
    return <>{children}</>
  }
}

const styles = StyleSheet.create({
  indicadorCargando: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default ActivityComponent