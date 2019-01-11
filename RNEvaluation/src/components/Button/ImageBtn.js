/**
 * Image Button
 * Author : Murugappan V
 * Date   : 10 Oct 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors, Images} from '../../asset'
import {SmallText} from '../Texts'

type Props = {
    onPress: Function,
    style?: number | Object | Array<number>,
    imgStyle?: number | Object | Array<number>,
    source: any,
    tintColor: string
}

export function ImageBtn(props: Props) {
    return <TouchableOpacity onPress={props.onPress} style={StyleSheet.flatten([styles.container, props.style])}>
        <Image tintColor={props.tintColor} style={StyleSheet.flatten([styles.imgStyle, props.imgStyle])} source={props.source ? props.source : Images.logoImg}/>
    </TouchableOpacity>
}

ImageBtn.defaultProps = {
    style: undefined,
    imgStyle:undefined,
    tintColor: Colors.bodyPrimaryLight
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    imgStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
    
})