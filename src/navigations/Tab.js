import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { enableScreens } from 'react-native-screens'
import Home from '../screens/home/Home';
import Cricket from '../screens/home/Cricket';
// import TVShow from '../screens/home/TVShow';
// import Movies from '../screens/home/Movies';
// import Coomingsoon from '../screens/home/Coomingsoon';

enableScreens();
const Tab = createBottomTabNavigator();

const MyTab = () => {

    return (
        <Tab.Navigator animationEnabled={true}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {borderTopWidth: 0, elevation: 10, height: 55},
                tabBarLabelStyle: {fontSize: 10, fontWeight: '600', marginBottom: 5, letterSpacing: .3, color: '#000000'},
                tabBarIconStyle: {borderRadius: 50,  alignSelf: 'center',},
                tabBarIcon: ({ color, focused }) => {

                    let iconSource;
                    let iconStyle = styles.icon;
                    if (route.name === 'Table') {
                        iconSource = require('../assets/Icon/table.png');

                    } else if (route.name === 'Team') {
                        iconSource = require('../assets/Icon/team.png');

                    } 
                    // else if (route.name === 'TV shows') {
                    //     iconSource = require('../assets/Icon/tv.png');

                    // } 
                    // else if (route.name === 'Movies') {
                    //     iconSource = require('../assets/Icon/popcorn.png');
                    // }

                    // else if (route.name === 'Reels') {
                    //     iconSource = require('../assets/Icon/reel.png');
                    //     iconStyle = styles.reelIcon;
                    // }

                    return <Image source={iconSource} style={[iconStyle, {tintColor: focused ? '#000000' : color}]} />;
                },
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: 'gray',
                // tabBarActiveBackgroundColor: '#040405',
                tabBarActiveBackgroundColor: '#FFFFFF',
                // tabBarInactiveBackgroundColor: '#040405',
                tabBarInactiveBackgroundColor: '#FFFFFF',
                tabBarHideOnKeyboard: true
            })}
        >
            <Tab.Screen name="Table" component={Home}/>
            <Tab.Screen name="Team" component={Cricket}/>
            {/* <Tab.Screen name="Reels" component={Coomingsoon}/> */}
            {/* <Tab.Screen name="Movies" component={Movies}/>
            <Tab.Screen name="TV shows" component={TVShow}/> */}
        </Tab.Navigator>
    )
}

export default MyTab

const styles = StyleSheet.create({
    icon: {
     height: 19, 
     width: 19,
    },
    reelIcon: {
     height: 32, 
     width: 32,
    },
})

