import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Option } from '../components';

const OnQuizScreen = ({ route }) => {
  const navigation = useNavigation();
  const { data } = route.params;
  const questions = data.questions;
  const [quizIndex, setQuizIndex] = useState(0)
  const [question, setQuestion] = useState(questions[quizIndex])
  const [isWelcome, setIsWelcome] = useState(false)
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false)
  const [timer, setTimer] = useState(10);


  useEffect(() => {
    if (questions.length > 0) {
      if (questions.length === quizIndex) {
        // navigation.navigate('Home')
        setIsWelcome(!isWelcome)
        return;
      }
      setSelected(false)
      setQuestion(questions[quizIndex]);
    }
  }, [quizIndex])

  const HandleNextQuestion = (next) => {
    const index = quizIndex + 1;
    setQuizIndex(index);
  }

  const GoHome = () => {
    navigation.navigate("Home")
  }

  const isCorrect = (index) => {
    return question.correctOption === index;
  }
  
  useEffect(() => {
    if(isWelcome) return
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else {
      alert('Time is up :(')
      // navigation.navigate('Home');
      setIsWelcome(true)
    }
    return () => clearInterval(interval);
  }, [timer, navigation]);


  return (
    <SafeAreaView className=' flex-1 flex justify-between  '>

      {
        !isWelcome ? (
          <View style={{
            display: isWelcome ? 'none' : 'flex'
          }} className=' px-4  '>
            <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  className=' border border-[#afadbe95] flex justify-center items-center w-[80px] mt-12 rounded-xl '
                >
                  <Text className=' text-[#53555c]  p-2 font-bold text-2xl  '>
                    Exit
                  </Text>
                </TouchableOpacity>
            <Text className=' text-[#53555c] mt-16 mb-4 p-2 font-bold text-4xl  '>
              {question.text}
            </Text>
            <Text className=' text-[#53555c] mb-4 p-2 font-bold text-xl  '>
              Time Remaining - {timer}
            </Text>

            {/* Options here */}

            <View className='  '>
              {question.options.map((op, i) => (
                <TouchableOpacity
                  onPress={() => {
                    if (question.correctOption === i) {
                      setScore(score + 1)
                      HandleNextQuestion()
                    } else {
                      HandleNextQuestion()
                      alert('Selected option is incorrect and score is ' + score)
                    }
                  }}
                  className=' border border-[#afadbe95] mb-2 rounded-xl '
                >
                  <Text className=' text-[#53555c]  p-4 font-bold text-2xl  '>
                    {op}
                  </Text>
                </TouchableOpacity>
                // <Option key={i} correct={question.correctOption} option={op} index={i} />
              ))}
            </View>
          </View>

        ) : (

          // Welcome screen

          <View className=' p-4 flex flex-1 justify-between '>
            <View>
              <Text
              className='  text-[#53555c] mt-28 mb-4 p-2 font-bold text-4xl  '
              >Thanks for Playing :) </Text>
              <Text
              className='  text-[#53555c] mt-28 mb-4 p-2 font-light text-xl  '
              > Your Score is {score} </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                GoHome()
              }}
              className='  bg-[#b1afc47d] rounded-xl '
            >
              <Text
                className='  text-[#53555c] p-4 font-bold text-2xl  '
              >Go Home</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </SafeAreaView>
  )
}

export default OnQuizScreen