import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ScreenContainer from '../../Common/screen-container'
import ThemedText from '../../Common/themed-text'
import { CoursesContext } from '../../../provider/courses-provider'
import { Rating } from 'react-native-elements'
import { AuthorContext } from '../../../provider/author-provider'
import { CourseDetailContext } from '../../../provider/courseDetail-provider'

const ListCoursesItem = (props) => {
    const courseDetailContext = useContext(CourseDetailContext)
    const coursesContext = useContext(CoursesContext)
    const authorContext = useContext(AuthorContext)

    const [course, setCourse] = useState("")

    useEffect(
        () => {
            coursesContext.getCourseInformation(props.item.id)
            if (coursesContext.state.course) {
                setCourse(coursesContext.state.course)
            }
        }, [])
    
    const Image_Http_URL = { uri: props.item.imageUrl }
    return (
        <ScreenContainer>
            <TouchableOpacity style={styles.item}
                onPress={() => {
                    authorContext.getInstructorById(course.instructorId)
                    coursesContext.getCourseInformation(props.item.id)
                    courseDetailContext.getCourseDetailWithLession(props.item.id)
                    props.navigation.navigate("CourseDetail", { item: props.item })
                }}
            >
                <Image source={Image_Http_URL} style={styles.image} />
                <ScreenContainer>
                    <View style={{ margin: 6 }}>
                        <ThemedText>{props.item.title}</ThemedText>
                        <ThemedText>{props.item.name ? props.item.name  : null }</ThemedText>
                        <ThemedText style={styles.darkText}>{props.item.price} VND . {props.item.videoNumber} video . {props.item.totalHours} hours </ThemedText>
                        <Rating imageSize={20} fractions="{1}" startingValue={props.item.ratedNumber} />
                    </View>
                </ScreenContainer>
            </TouchableOpacity>
        </ScreenContainer>
    )
}

export default ListCoursesItem

const styles = StyleSheet.create({
    item: {
        margin: 6,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 0
    },
    darkText: {
        color: 'darkgray'
    }
})
