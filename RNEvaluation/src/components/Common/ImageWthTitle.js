/**
 * App Footer 
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { ScaleMinSampleDesg} from '../../asset'
import {MediumText} from '../Texts'

type Props = {
    title: string,
    style?: number | Object | Array<number>,
    imageStyle?: number | Object | Array<number>,
    textStyle?: number | Object | Array<number>,
    source: Object
}

export function ImageWthTitle(props: Props) {
    return <View style={StyleSheet.flatten([styles.container, props.style])}>
        <Image style={StyleSheet.flatten([styles.image, props.imageStyle])} source={props.source}/>
        {!!props.title && <MediumText style={StyleSheet.flatten([styles.text, props.textStyle])} text={props.title}/>}
    </View>
}

ImageWthTitle.defaultProps = {
    style: undefined,
    imageStyle: undefined,
    textStyle:undefined,
    title: undefined
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    image: {
        width: ScaleMinSampleDesg(80, 80),
        height: ScaleMinSampleDesg(80, 80),
        resizeMode: 'stretch',
        marginBottom: 10
    },
    text: {

    }
})

//   onPress: Function,
        // <TouchableHighlight
        // onPress={props.onPress}
        // style={StyleSheet.flatten([styles.container, props.style])}
        // >
        // <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.children}</Text>
        // </TouchableHighlight>