import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'

const QuizDetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <SafeAreaView
      className=' bg-[#fcf8ff] flex-1 px-4 flex justify-end '
    >
      <View className=' mt-8 py-20 w-full flex justify-center items-start '>
        <Text
          className=' text-[#a9a7ac] font-semibold text-3xl '
        >points {data.questions.length} </Text>
        <Text
          className=' my-2 text-[#5a5c63] font-semibold text-5xl '
        >{data.title} </Text>
        <Text
          className=' text-[#9f9c91] font-normal text-base '
        >{data.description} </Text>
      </View>

      <View className=' w-full '>
        <TouchableOpacity
        onPress={() => navigation.navigate('ON',{data})}
        activeOpacity={0.9}
        className=' bg-[#43475a] p-4 mb-4 flex justify-center items-center rounded-3xl '
        >
        <Text
          className=' text-[#f8fcff] font-thin text-3xl '
        >Start</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default QuizDetailScreen