import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { authentication } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createUser, getUser } from '../../firebase/operations';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ }) => {

    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onLoginPress = async () => {
        const userCred = await signInWithEmailAndPassword(authentication, email, password).catch(err => alert("Wrong credentials"))
        // console.log(userCred.user.email)
        const user = await getUser(userCred.user.uid)
        // console.log(user)
        if (user) {
            // navigation.navigate('Home', { data: user })
        }

    }
    const onRegisterPress = async () => {

        if (password !== confirmPassword) {
            alert('Password doesn\'t match!')
            return;
        }

        const userCred = await createUserWithEmailAndPassword(authentication, email, password);
        const uid = userCred.user.uid;
        const user = await createUser({ uid, fullName, email });
    }

    return (
        <SafeAreaView
            className=' flex flex-col bg-[#222128] flex-1 items-center justify-center '
        >
            <View
                className=' w-full p-6 flex-1 flex justify-end flex-col items-center '
            >
                <Image
                    source={require('../../assets/icon.png')}
                    className=" h-20 w-20  "
                />
                <Text className={' text-[#d6d6e8] font-black text-4xl  ' + (isLogin ? 'mt-20' : 'mt-10') }>
                    {isLogin ? 'Welcome back' : 'Register now'}
                </Text>

                <View
                    className={' gap-3 w-full flex justify-center items-center ' + (isLogin ? 'mt-20' : 'mt-10')  }
                >

                    {!isLogin && (
                        <TextInput
                            placeholder='Full name'
                            className=' border-[1px] text-lg w-full border-[#ffffff36] text-white p-5 px-8 focus:border-[#ffffff6d] duration-200 rounded-[20px] '
                            placeholderTextColor="#ffffff36"
                            onChangeText={(text) => setFullName(text)}
                            value={fullName}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    )}

                    <TextInput
                        placeholder='E-mail'
                        className=' border-[1px] text-lg w-full border-[#ffffff36] text-white p-5 px-8 focus:border-[#ffffff6d] duration-200 rounded-[20px] '
                        placeholderTextColor="#ffffff36"
                        dataDetectorTypes={'all'}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        className=' border-[1px] text-lg w-full border-[#ffffff36] text-white p-5 px-8 focus:border-[#ffffff6d] duration-200 rounded-[20px] '
                        placeholderTextColor="#ffffff36"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {!isLogin && (
                        <TextInput
                            placeholder='Confirm Password'
                            className=' border-[1px] text-lg w-full border-[#ffffff36] text-white p-5 px-8 focus:border-[#ffffff6d] duration-200 rounded-[20px] '
                            placeholderTextColor="#ffffff36"
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    )}

                </View>

                <View className={'flex justify-center gap-5 items-center w-full ' + (isLogin ? 'mt-20' : 'mt-10')  } >

                    <TouchableOpacity
                        className=' w-full flex justify-center items-center bg-white p-5 px-8 duration-200 rounded-[20px] '
                        onPress={() => {
                            if (isLogin) {
                                onLoginPress();
                            } else {
                                onRegisterPress();
                                // console.log('hey')
                            }
                        }}>
                        <Text className='text-lg text-black font-black '>
                            {isLogin ? ('Log in') : ('Sign in')}
                        </Text>
                    </TouchableOpacity>
                    <View >
                        <Text
                            className=' text-sm text-[#ffffff48] '
                        >
                            {isLogin ? 'Don\'t have an account?' : 'have an account?'}
                            <Text
                                className=' text-sm text-[#ffffff86] '
                                onPress={() => setIsLogin(!isLogin)} >{isLogin ? (' Sign in') : (' Log in')}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen