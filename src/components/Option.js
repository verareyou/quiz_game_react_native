import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


const Option = ({ correct, option, index }) => {
    const [selected, setSelected] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    const check = () => {
        if (correct === index) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                setSelected(!selected)
                check();
            }}
            className={' border border-[#afadbe95] mb-2 rounded-xl '
                + (isCorrect ? selected && 'border-[#74ff55]' : selected && 'border-[#ff5555]')
                // + (isCorrect && 'border-[#ff5555]')
            }
        >
            <Text className=' text-[#53555c]  p-4 font-bold text-2xl  '>
                {option}
            </Text>
        </TouchableOpacity>
    )
}

export default Option