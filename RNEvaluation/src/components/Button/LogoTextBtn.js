/**
 * Logo Text
 * Author : Murugappan V
 * Date   : 5 oct 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MediumText } from '../Texts';

type Props = {
    onPress: Function,
    style?: number | Object | Array<number>,
    imageStyle?: number | Object | Array<number>,
    textStyle?: number | Object | Array<number>,
    text: string,
    source: Object
}

export function LogoTextBtn(props: Props) {
    return <TouchableOpacity onPress={props.onPress} style={StyleSheet.flatten([styles.container, props.style])}>
        <Image style={StyleSheet.flatten([styles.image, props.imageStyle])} source={props.source}/>
        <MediumText style={StyleSheet.flatten([styles.text, props.textStyle])} text={props.text}/>
    </TouchableOpacity>
}

LogoTextBtn.defaultProps = {
    style: undefined,
    imageStyle: undefined,
    textStyle:undefined
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        flex: 3
    },
    text: {
        flex: 7,
        textAlign: 'left',
    }
})