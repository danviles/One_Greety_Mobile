// /* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import { BottomNavigation } from 'react-native-paper';
// import Espacios from '../views/Espacios';
// import Chat from '../views/Chat';
// import EspaciosSeguidos from '../views/EspaciosSeguidos';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

// const MenuPrincipal = () => {
//   // const Tab = createMaterialBottomTabNavigator();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'espacios', title: 'Espacios', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
//     { key: 'seguidos', title: 'Seguidos', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
//     { key: 'chat', title: 'Chat', focusedIcon: 'chat', unfocusedIcon: 'chat-outline' },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     espacios: Espacios,
//     seguidos: EspaciosSeguidos,
//     chat: Chat,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//       labeled={false}
//       barStyle={{
//         backgroundColor: 'rgba(24, 19, 24, 0.8)',
//         position: 'absolute',
//         bottom: -10,
//         marginHorizontal: 50,
//         borderTopLeftRadius: 50,
//         borderTopRightRadius: 50,
//         overflow: 'hidden',
//       }}
//       tabBarStyle={{
//         backgroundColor: 'red',
//       }}
//       activeColor="#fd7175"
//       inactiveColor="#fff"
//       shifting={true}

//     />
//   );
// };

// export default MenuPrincipal;`

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Espacios from '../views/Espacios';
import Chat from '../views/Chat';
import EspaciosSeguidos from '../views/EspaciosSeguidos';
import Perfil from '../views/Perfil';

import {theme} from '../core/theme';

const MenuPrincipal = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(24, 19, 24, 0.8)',
          position: 'absolute',
          marginHorizontal: 50,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderWidth: 2,
          padding: 1,
        },
        tabBarActiveTintColor: '#fd7175',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
      }}
      initialRouteName="Espacios">
      <Tab.Screen
        name="Espacios"
        component={Espacios}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Espacios seguidos"
        component={EspaciosSeguidos}
        options={{
          headerShown: false,

          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,

          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chat-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,

          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuPrincipal;
