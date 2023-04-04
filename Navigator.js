import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditQuizScreen, HomeScreen, LoginScreen, QuizDetailScreen } from './src/screens';
import OnQuizScreen from './src/screens/OnQuizScreen';
// import { Image, useAnimatedValue } from 'react-native';

// const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

export const LoggedInScreens = () => {

    return (<>
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName='Home'
            >

                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        animation: 'fade_from_bottom',
                        headerShown: false,
                        statusBarTranslucent:true
                    }}
                />
                <Stack.Screen
                    name='Detail'
                    component={QuizDetailScreen}
                    options={{
                        animation: 'fade_from_bottom',
                        headerShown: false,
                        statusBarTranslucent:true
                    }}
                />
                <Stack.Screen
                    name='ON'
                    component={OnQuizScreen}
                    options={{
                        animation: 'fade_from_bottom',
                        headerShown: false,
                        statusBarTranslucent:true
                    }}
                />
                <Stack.Screen
                    name='Edit'
                    component={EditQuizScreen}
                    options={{
                        animation: 'fade_from_bottom',
                        headerShown: false,
                        statusBarTranslucent:true
                    }}
                />

            </Stack.Navigator>
            
        </NavigationContainer >

    </>
    )
}

export const LoggedOutScreens = () => {

    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName='Login'
            >

                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        animation: 'fade_from_bottom',
                        headerShown: false,
                        animationDuration: 500,
                        // statusBarTranslucent:true
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer >
    )
}
