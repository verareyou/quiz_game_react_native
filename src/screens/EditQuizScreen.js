import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../providers'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../../firebase/config';
// import { Icon } from 'react-native-vector-icons/Icon';

const EditQuizScreen = ({ route, navigation }) => {
    const { data } = route.params;
    const { setListen } = useStore();
    const [quizName, setQuizName] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{
        id: 1,
        text: '',
        options: ['', '', '', ''],
        correctOption: null
    }]);

    // Function to update state variables with quiz data
    const loadQuizData = (quizData) => {
        setQuizName(quizData.title);
        setDescription(quizData.description);
        const quizQuestions = quizData.questions.map((questionData, index) => ({
            id: index + 1,
            text: questionData.text,
            options: questionData.options,
            correctOption: questionData.correctOption
        }));
        setQuestions(quizQuestions);
    };

    // Call loadQuizData function with quiz data
    useEffect(() => {
        loadQuizData(data);
    }, []);

    // Function to handle updating question data
    const handleQuestionChange = (questionId, key, value) => {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    [key]: value
                };
            } else {
                return question;
            }
        }));
    };

    const handleDeleteQuestion = (questionId) => {
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
    };

    // Function to handle updating option data
    const handleOptionChange = (questionId, optionIndex, value) => {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            if (question.id === questionId) {
                const options = [...question.options];
                options[optionIndex] = value;
                return {
                    ...question,
                    options: options
                };
            } else {
                return question;
            }
        }));
    };

    // Function to handle updating correct option
    const handleCorrectOptionChange = (questionId, optionIndex) => {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    correctOption: optionIndex
                };
            } else {
                return question;
            }
        }));
    };

    const handleSaveQuiz = async () => {
        try {
            if (questions[0].text === '' || questions[0].correctOption === null) {
                alert('Add Questions')
                return;
            }
            const quizRef = doc(db, 'quizzes', data.id);
            const res = await updateDoc(quizRef, {
                title: quizName,
                description: description,
                questions,
            });
            // console.log()
            setListen(Math.random)
            navigation.navigate('Home')
        } catch (error) {
            console.log("Update error : " + error)
        }
    }

    const handleDeleteQuiz = async () => {
        try {
            const quizRef = doc(db, 'quizzes', data.id);
            await deleteDoc(quizRef);
            alert('Quiz deleted successfully');
            // Navigate back to previous screen
            navigation.navigate("Home")
            setListen(Math.random)
        } catch (error) {
            console.error('Error deleting quiz: ', error);
            alert('Error deleting quiz. Please try again.');
        }
    };


    return (
        <SafeAreaView className=' h-full flex justify-start items-center bg-[#fcf8ff] '>
            <ScrollView className=' w-full px-2  mt-[40px] '>
                <View className=' w-full flex justify-evenly items-center flex-row py-8 mt-[-10px]   '>
                    <Text className=' text-[#5a5c63] ml-12 flex-1 text-center font-black text-2xl '>
                        Editing Quiz
                    </Text>

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
                <TextInput
                    placeholder='Quiz Name'
                    placeholderTextColor="#5a5c63"
                    className=' text-lg px-4 py-3 border border-[#5a5c633a] rounded-xl placeholder:text-[#5a5c63] text-[#5a5c63] '
                    value={quizName}
                    onChangeText={text => setQuizName(text)}
                />
                <TextInput
                    placeholder='Description'
                    placeholderTextColor="#5a5c63"
                    className=' text-lg mt-2 p-4 border border-[#5a5c633a] rounded-xl placeholder:text-[#fff] text-[#5a5c63] '
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                {questions.map((question) => (
                    <View
                        className=' bg-[#a39ebb1b] mt-6 p-4 rounded-xl w-full  '
                        key={question.id}>
                        <View className=' flex flex-row justify-between w-full mb-2  '>
                            <TextInput
                                placeholder='Question title'
                                placeholderTextColor="#5a5c63aa"
                                className=' text-lg border w-[75%] p-4 border-[#5a5c633a] rounded-xl placeholder:text-[#fff] text-[#5a5c63] '
                                value={question.text}
                                onChangeText={text => handleQuestionChange(question.id, 'text', text)} />
                            <TouchableOpacity
                                onPress={() => handleDeleteQuestion(question.id)}
                                activeOpacity={0.1}
                                className=' border flex justify-center items-center w-[20%] border-[#5a5c633a] rounded-xl '
                            >
                                <Text className='text-3xl'>x</Text>
                            </TouchableOpacity>
                        </View>
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
                <TouchableOpacity
                    activeOpacity={0.7}
                    className=' bg-[#a39ebb1b] flex mt-3 justify-center items-center p-5 rounded-xl '
                    onPress={() => setQuestions(prevState => [...prevState, { id: prevState.length + 1, text: '', options: ['', '', '', ''], correctOption: null }])}>
                    <Text
                        className=' text-black text-base font-bold '
                    >Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className=' bg-[#acfb84] mt-3 flex justify-center items-center p-5 rounded-xl '
                    onPress={handleSaveQuiz}
                >
                    <Text
                        className=' text-black text-base font-bold '
                    >Save Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className=' bg-[#ff5050] mb-24 mt-3 flex justify-center items-center p-5 rounded-xl '
                    onPress={handleDeleteQuiz}

                >
                    <Text
                        className=' text-black text-base font-bold '
                    >
                        Delete Quiz

                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditQuizScreen