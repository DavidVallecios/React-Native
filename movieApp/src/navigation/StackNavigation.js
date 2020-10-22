import React from 'react';
import {IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

const StackNavigation = ({navigation}) => {
  const {openDrawer} = navigation;

  const buttonLeft = (screen) => {

    switch (screen) {
      case "movie":
      case "search":
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      
      default:
        return (
          <IconButton icon="menu" onPress={openDrawer} />
        );
    }
  };

  const buttonRight = () => {
    return <IconButton icon="magnify" onPress={() => navigation.navigate('search')} />;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => buttonLeft('home'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('movie'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'Nuevas peliculas',
          headerLeft: () => buttonLeft('news'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'Peliculas populares',
          headerLeft: () => buttonLeft('popular'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{title: '', headerTransparent: true, headerLeft: () => buttonLeft('search')}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
