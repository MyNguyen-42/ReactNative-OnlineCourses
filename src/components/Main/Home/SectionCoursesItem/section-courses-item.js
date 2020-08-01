import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ScreenContainer from '../../../Common/screen-container'
import ThemedText from '../../../Common/themed-text'
import { CoursesContext } from '../../../../provider/courses-provider'

const SectionCoursesItem = (props) => {
    const courseContext = useContext(CoursesContext)
    const randomnumber = Math.floor(Math.random() * (700 - 200 + 1)) + 200
    const Image_Http_URL = { uri: `https://picsum.photos/${randomnumber}` }

    return (
        <TouchableOpacity
            onPress={() => {
                courseContext.addLearningCourse(props.item.id)
                props.navigation.push("CourseDetail", {item: props.item})
            }}
        >
            <ScreenContainer style={styles.item}>
                <Image source={Image_Http_URL} style={styles.image} />
                <View style={{ margin: 5}}>
                    <ThemedText>{props.item.title}</ThemedText>
                    <ThemedText>{props.item.author}</ThemedText>
                    <Text style={styles.darkText}>{`${props.item.level} . ${props.item.released} . ${props.item.duration}`}</Text>
                </View>
            </ScreenContainer>
        </TouchableOpacity>
    )
}

export default SectionCoursesItem

const styles = StyleSheet.create({
    item: {
        margin: 6,
        height: 121,
        width: 400,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1

    },
    image: {
        width: 120,
        height: 120
    },
    darkText: {
        color: 'gray'
    }
})
