import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { authentication, db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../firebase/operations';
import { List } from '../components';
import { useStore } from '../../providers';

const AllQuizScreen = () => {
    const { listen } = useStore()
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const getAllQuizzes = async () => {
            try {
                const qs = await getDocs(collection(db, 'quizzes'));
                const data = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setQuizzes(data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getAllQuizzes();
    }, [listen]);


    return (
        <SafeAreaView className=' h-full flex flex-1 justify-start items-center bg-[#ebe8f8] '>
            <ScrollView
                className=' w-full '>
                <View className=' mt-20 flex w-full justify-center rounded-xl border-[#ffffff4f] border-0 items-start  '>
                    <Text className=' text-[#53555c] p-4 font-thin  text-center text-4xl  '>
                        All quizzes
                    </Text>
                </View>
                <View className=' px-2 mt-6 mb-24 '>
                    <List quizzes={quizzes} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AllQuizScreen