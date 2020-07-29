import React, { useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import SectionCoursesItem from '../SectionCoursesItem/section-courses-item'
import Icon from 'react-native-vector-icons/FontAwesome';
import ThemedText from '../../../Common/themed-text';
import { CoursesContext } from '../../../../provider/courses-provider';
import { isloading } from '../../../../action/courses-action';

const SectionCourses = (props) => {
    const courseContext = useContext(CoursesContext)
    const renderListItem = (courses) => {
        return courses.map(item => <SectionCoursesItem navigation={props.navigation} item={item} />);
    }

    useEffect(() => {
        getTopSellCourses()
        getTopNewCourses()
        getTopRateCourses()
    })

    const getTopSellCourses = () => {
        API.post('/course/top-sell', {
            "limit": 10,
            "page": 1
        }).then((Response) => {
            if (Response.status === 200) {
                courseContext.setIsLoading(false)
                courseContext.setTopSellingCourseIds(Response.data.payload)
            } else {
                return new Array()
            }
        }).catch((Error) => {
            return new Array()
        })
    }

    const getTopNewCourses = () => {
        API.post('/course/top-new', {
            "limit": 10,
            "page": 1
        }).then((Response) => {
            if (Response.status === 200) {
                courseContext.setIsLoading(false)
                courseContext.setTopnNewCourseIds(Response.data.payload)
            } else {
                return new Array()
            }
        }).catch((Error) => {
            return new Array()
        })
    }

    const getTopRateCourses = () => {
        API.post('/course/top-rate', {
            "limit": 10,
            "page": 1
        }).then((Response) => {
            if (Response.status === 200) {
                courseContext.setIsLoading(false)
                courseContext.setTopRateCourseIds(Response.data.payload)
            } else {
                return new Array()
            }
        }).catch((Error) => {
            return new Array()
        })
    }

    const renderListItemCondition = () => {
        if (props.title === 'Top Rating') {
            const courses1 = courseContext.topRateCourseIds
            console.log("top rate", courses1)
            return renderListItem(courses1)
        } else if (props.title === 'Top Selling') {
            const course2 = courseContext.topSellingCourseIds
            return renderListItem(course2)
        } else if (props.title === 'Top New Courses') {
            const course3 = courseContext.topNewCourseIds
            return renderListItem(course3)
        }  else if (props.title === 'Countinue learning') {
            const courseTemp = []
            const course4 = Array.from(courseContext.learningCourseIds)
            for(const x of courseContext.learningCourseIds) {
                courseTemp.push(courseContext.courses[x-1])
            }
            if (course4.length === 0) {
                return
            } else {
                return renderListItem(courseTemp)
            }
        }
    }

    return (
        <View>
            {isloading && <ActivityIndicator size = "large" color = "red" />}
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
                    <ThemedText style={{ margin: 6, flex: 1 }}>
                        {props.title}
                    </ThemedText>
                    <View style={{ backgroundColor: 'lightgray', marginRight: 6, paddingHorizontal: 10, borderRadius: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate("AllCourses", {item: courseContext.courses})
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Text style={{ marginRight: 6 }}>
                                See all
                    </Text>
                            <Icon name="angle-right" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView horizontal={true}>
                {renderListItemCondition()}
            </ScrollView>
        </View>
    )
}

export default SectionCourses

const styles = StyleSheet.create({})
