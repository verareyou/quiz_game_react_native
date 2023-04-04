import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { authentication, db } from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { useStore } from '../../providers'

const MyQuizScreen = ({ navigation }) => {

    const [quizzes, setQuizzes] = useState([]);
    const { userData, listen, user } = useStore()

    useEffect(() => {
        const getAllQuizzes = async () => {
            try {
                const q = query(collection(db, 'quizzes'), where('createdBy', '==', authentication.currentUser.uid))
                const qs = await getDocs(q)

                // const qs = await getDocs(collection(db, 'quizzes'),where('createdBy',''));
                const data = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

                // const usered = await userData()
                // setUser(usered)
                setQuizzes(data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getAllQuizzes();
    }, [listen]);



    const sign_Out = () => {
        signOut(authentication).then(console.log('logged out'))
    }


    return (

        <SafeAreaView className=' h-full flex flex-1 justify-start items-start bg-[#ebe8f8] '>
            <ScrollView
                className=' w-full '>
                <View className=' flex flex-row mt-24 px-4 justify-between items-center '>
                    <Text
                        className=' text-[#525558] font-bold text-3xl '
                    >Hi! {user.fullName} </Text>
                    <TouchableOpacity
                        onPress={() => sign_Out()}
                        activeOpacity={0.9}
                        className=' bg-[#43475a] p-4 flex justify-center items-center rounded-3xl '
                    >
                        <Text
                            className=' text-[#f8fcff] font-bold '
                        >Sign out </Text>
                    </TouchableOpacity>
                </View>
                <View className=' mt-4 flex w-full justify-center rounded-xl border-[#ffffff4f] border-0 items-start  '>
                    <Text className=' text-[#53555c] p-4 font-thin  text-center text-4xl  '>
                        Your quizzes  {quizzes.length}
                    </Text>
                </View>
                <View className=' px-2 mt-6 mb-24 '>
                    {
                        quizzes.length > 0 && quizzes.map(quiz => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('Edit', { data: quiz })}
                                key={quiz.id}
                                className=' p-8 mb-3 rounded-3xl bg-[#fcf8ff] flex justify-between items-start '
                            >
                                <Text
                                    className=' text-[#81848e] text-sm font-light '
                                >points {quiz.questions.length}
                                </Text>
                                <Text
                                    className=' text-[#5a5c63] text-3xl font-black '
                                >
                                    {quiz.title}
                                </Text>
                            </TouchableOpacity>

                        ))
                    }
                    {/* <List quizzes={quizzes} /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyQuizScreen