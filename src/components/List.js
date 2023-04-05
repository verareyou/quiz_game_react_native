import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const List = ({quizzes}) => {
    const navigation = useNavigation();
    return (
        <View>
            {
                quizzes.length > 0 && quizzes.map(quiz => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Detail', { data: quiz })}
                        key={quiz.id}
                        className=' p-8 mb-3 rounded-3xl bg-[#fcf8ff] flex justify-between items-start '
                    >
                        <Text
                            className=' text-[#81848e] text-sm font-light '
                        >points {quiz.questions.length}
                        </Text>
                        <Text
                            className=' text-[#81848e] text-sm font-light '
                        >Questions {quiz.questions.length}
                        </Text>
                        <Text
                            className=' text-[#5a5c63] text-3xl font-black '
                        >
                            {quiz.title}
                        </Text>
                       
                    </TouchableOpacity>

                ))
            }
        </View>
    )
}

export default List