import { View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyQuizScreen from './MyQuizScreen'
import AllQuizScreen from './AllQuizScreen'
import CreateQuizScreen from './CreateQuizScreen'

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {


    return (
        <Tab.Navigator
            initialRouteName='AllQuizes'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    margin: 15,
                    backgroundColor: '#fcf8ff',
                    marginHorizontal: 40,
                    borderRadius: 20,
                    height: 70,
                    elevation: 10,
                    shadowColor: '#aaaaaa',
                }
            }}

        >
            <Tab.Screen
                component={AllQuizScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            justifyContent: 'center',
                            tintColor: focused ? '#151515' : '#aaaaaa',

                            alignItems: 'center'
                        }}>
                            <Image
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#151515' : '#666666'
                                }}
                                source={require('../../assets/icons/allquiz.png')} />
                            {/* <Text
                                style={{
                                    color: focused ? '#151515' : '#666666'
                                }}
                                >Quizes</Text> */}
                        </View>

                    )
                }}
                name='AllQuizes'
            />
            <Tab.Screen
                component={CreateQuizScreen}
                name='CreateQuizes'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            justifyContent: 'center',
                            tintColor: focused ? '#151515' : '#aaaaaa',
                            alignItems: 'center'
                        }}>
                            <Image
                                style={{
                                    width: 55,
                                    height: 55,
                                    tintColor: focused ? '#151515' : '#666666'
                                }}
                                source={require('../../assets/icons/add.png')} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                component={MyQuizScreen}
                name='MyQuizes'
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            justifyContent: 'center',
                            tintColor: focused ? '#151515' : '#aaaaaa',

                            alignItems: 'center'
                        }}>
                            <Image
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#151515' : '#666666'
                                }}
                                source={require('../../assets/icons/my.png')} />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeScreen