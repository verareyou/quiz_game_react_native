import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../../providers'
import { addDoc, collection } from 'firebase/firestore/lite';
import { authentication, db } from '../../firebase/config';

const CreateQuizScreen = () => {
    const { user, listen, setListen } = useStore();
    const [quizName, setQuizName] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([{
        id: 1,
        text: '',
        options: ['', '', '', ''],
        correctOption: null
    }])

    // handle create

    const handleCreateQuiz = async () => {
        try {
            if (questions[0].text === '' || questions[0].correctOption === null) {
                alert('Add Questions')
                return;
            }
            const quizRef = await addDoc(collection(db, "quizzes"), {
                createdBy: authentication.currentUser.uid,
                title: quizName,
                description: description,
                questions,
            });

            console.log("quiz id : " + quizRef.id)

            setListen(Math.random)

            setQuestions([{
                id: 1,
                text: '',
                options: ['', '', '', ''],
                correctOption: null
            }])
            setDescription('')
            setQuizName('')

        } catch (err) {
            console.log(err.message)
        }
    }

    // handle question changes
    const handleQuestionChange = (questionId, field, value) => {
        setQuestions(prevState =>
            prevState.map(q =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
        );
    };

    // handle option changes
    const handleOptionChange = (questionId, optionIndex, value) => {
        setQuestions(prevState =>
            prevState.map(q =>
                q.id === questionId
                    ? { ...q, options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)) }
                    : q
            )
        );
    };

    // handle correct option changes
    const handleCorrectOptionChange = (questionId, value) => {
        setQuestions(prevState =>
            prevState.map(q =>
                q.id === questionId ? { ...q, correctOption: value } : q
            )
        );
    };

    const handleDeleteQuestion = (questionId) => {
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
    };

    return (
        <SafeAreaView className=' h-full flex justify-start items-center bg-[#fcf8ff] '>
            <ScrollView className=' w-full px-2  mt-[40px] '>
                <View className=' w-full flex justify-evenly items-center flex-row py-8 mt-[-10px]   '>
                    <Text className=' text-[#5a5c63] ml-12 flex-1 text-center font-black text-2xl '>
                        Create New Quiz❔
                    </Text>

                    {/* Reset Button */}
                    
                    <Text onPress={() => {
                        setQuestions([{
                            id: 1,
                            text: '',
                            options: ['', '', '', ''],
                            correctOption: null
                        }])
                        setDescription('')
                        setQuizName('')
                    }}
                        className=' mr-4 text-[#ff9191] font-light text-xl '>
                        clear
                    </Text>
                </View>

                <TextInput // Quiz Name
                    placeholder='Quiz Name'
                    placeholderTextColor="#5a5c63"
                    className=' text-lg px-4 py-3 border border-[#5a5c633a] rounded-xl placeholder:text-[#5a5c63] text-[#5a5c63] '
                    value={quizName}
                    onChangeText={text => setQuizName(text)}
                />
                <TextInput // Quiz Description
                    placeholder='Description'
                    placeholderTextColor="#5a5c63"
                    className=' text-lg mt-2 p-4 border border-[#5a5c633a] rounded-xl placeholder:text-[#fff] text-[#5a5c63] '
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

                {/* Questions */}

                {questions.map(question => (
                    <View
                        className=' bg-[#a39ebb1b] mt-6 p-4 rounded-xl w-full  '
                        key={question.id}>
                        <View className=' flex flex-row justify-between w-full mb-2  '>

                            <TextInput // Question Title
                                placeholder='Question title'
                                placeholderTextColor="#5a5c63aa"
                                className=' text-lg border w-[75%] p-4 border-[#5a5c633a] rounded-xl placeholder:text-[#fff] text-[#5a5c63] '
                                value={question.text}
                                onChangeText={text => handleQuestionChange(question.id, 'text', text)}
                            />

                            <TouchableOpacity // Delete Question
                                onPress={() => handleDeleteQuestion(question.id)}
                                activeOpacity={0.1}
                                className=' border flex justify-center items-center w-[20%] border-[#5a5c633a] rounded-xl '
                            >
                                <Text className='text-3xl'>x</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Options List */}

                        {question.options.map((option, index) => (
                            <View
                                className=' flex flex-row mt-[8px] h-12 w-full '
                                key={index}>
                                <TextInput
                                    placeholderTextColor="#5a5c6377"
                                    className=' flex-1 px-4 rounded-l-xl bg-[#5a5c6312] placeholder:text-[#ffffff] text-[#5a5c63] '
                                    placeholder={`option ` + (index + 1)}
                                    value={option}
                                    onChangeText={text => handleOptionChange(question.id, index, text)} />
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    className={' h-full w-20 flex rounded-r-xl justify-center items-center ' + (question.correctOption === index ? 'bg-[#acfb84]' : 'bg-[#ff6565]')}
                                    onPress={() => handleCorrectOptionChange(question.id, index)}>
                                    <Text
                                    >{question.correctOption === index ? 'Correct' : 'Incorrect'}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ))}

                <TouchableOpacity // Add Question Button
                    activeOpacity={0.7}
                    className=' bg-[#a39ebb1b] flex mt-3 justify-center items-center p-5 rounded-xl '
                    onPress={() => setQuestions(prevState => [...prevState, { id: prevState.length + 1, text: '', options: ['', '', '', ''], correctOption: null }])}>
                    <Text
                        className=' text-black text-base font-bold '
                    >Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className=' bg-[#acfb84] mb-24 mt-3 flex justify-center items-center p-5 rounded-xl '
                    onPress={handleCreateQuiz}
                >
                    <Text
                        className=' text-black text-base font-bold '
                    >Create Quiz</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateQuizScreen