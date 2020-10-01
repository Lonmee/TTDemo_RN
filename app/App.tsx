/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducers';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import User from './components/User';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {composeWithDevTools} from 'redux-devtools-extension';
import Comment from './components/Comment';

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Provider
      store={createStore(rootReducer, composeWithDevTools(applyMiddleware()))}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home">{(props) => <Home {...props} />}</Tab.Screen>
          <Tab.Screen name="Profile" component={User} />
          <Tab.Screen name="Record" component={User} />
          <Tab.Screen name="Message" component={User} />
          <Tab.Screen name="Mine" component={User} />
        </Tab.Navigator>
      </NavigationContainer>
      <Comment />
    </Provider>
  );
};

export default App;
