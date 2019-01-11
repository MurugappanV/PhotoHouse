/**
 * Loading component with large spinner and title
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import {Colors, Metrics, ScaleSampDesgHeight, ScaleSampDesgWidth} from '../../asset'
import {LargeText} from '../Texts'

type Props = {
    title: string,
    style?: number | Object | Array<number>,
    textStyle?: number | Object | Array<number>,
}

const renderLoading = () => {
    return <ActivityIndicator size="large" color={Colors.bodySecondaryDark} />
}

export function Loading(props: Props) {
    return <View style={StyleSheet.flatten([styles.container, props.style])}>
        <LargeText style={StyleSheet.flatten([styles.text, props.textStyle])} text={props.title}/>
        {renderLoading()}
    </View>
}

Loading.defaultProps = {
    style: undefined,
    textStyle: undefined,
    title: "Loading"
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.bgPrimaryLight,
        borderRadius: Metrics.SMOOTH_CORNER,
        width: ScaleSampDesgWidth(310),
        height: ScaleSampDesgHeight(145),
        elevation: 20
    },
    text: {
        paddingBottom: 20,
        fontFamily: "HP Simplified Regular",
    },
})

//   onPress: Function,
        // <TouchableHighlight
        // onPress={props.onPress}
        // style={StyleSheet.flatten([styles.container, props.style])}
        // >
        // <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.children}</Text>
        // </TouchableHighlight>