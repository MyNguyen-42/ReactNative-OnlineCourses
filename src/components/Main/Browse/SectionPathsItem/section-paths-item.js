import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-elements'
import ScreenContainer from '../../../Common/screen-container'
import ThemedText from '../../../Common/themed-text'


const SectionPathsItem = (props) => {
    const randomnumber = Math.floor(Math.random() * (700 - 200 + 1)) + 200
    Image_Http_URL = { uri: `https://picsum.photos/${randomnumber}` }
    return (
        <ScreenContainer>
            <TouchableOpacity
                style={styles.touch}
                onPress={() => {
                    props.navigation.navigate("PathDetail", {item: props.item})
                }}
            >
                <Image style={styles.image} source={Image_Http_URL} />
                <View style={styles.text}>
                <ThemedText h5>
                    {props.item.title}
                </ThemedText>
                </View>
            </TouchableOpacity>

        </ScreenContainer>
    )
}

export default SectionPathsItem

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 250,
        margin: 6,
        marginBottom: 0,
        flex: -3
    },
    touch: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',

    },
    text: {
        flex: 3,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 6,
        marginTop: 0,
        padding: 10,
        paddingHorizontal: 40
    }
})
