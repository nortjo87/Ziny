import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Dashboard from './dashboard';
import Profile from './profile';
import ProjectList from './project_list'; // Import the new ProjectList component
import { IconButton } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = 'view-dashboard';
            } else if (route.name === 'Profile') {
              iconName = 'account';
            } else if (route.name === 'Project List') {
              iconName = 'format-list-bulleted';
            }

            return <IconButton icon={iconName} color={color} size={size} />;
          },
          tabBarActiveBackgroundColor: '#95D2B3',
          tabBarInactiveBackgroundColor: 'white',
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Project List" component={ProjectList} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </PaperProvider>
  );
}
