/**
 * Common Button UIs
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors} from '../../asset'
import {SmallText} from '../Texts'

type Props = {
    onPress: Function,
    style?: number | Object | Array<number>,
    textStyle?: number | Object | Array<number>,
    buttonTheme: string,
    title: string
}

export function Button(props: Props) {
    return <TouchableOpacity onPress={props.onPress} 
        style={StyleSheet.flatten([styles.container, props.style, props.buttonTheme=='Dark' ? styles.contDark: props.buttonTheme=='Varient' ? styles.constVarient: styles.constLight])}>
        <SmallText 
            style={StyleSheet.flatten([styles.text, props.textStyle, props.buttonTheme=='Dark' ? styles.textLight: props.buttonTheme=='Varient' ? styles.textLight: styles.textDark])} 
            text={props.title}
        />
    </TouchableOpacity>
}

Button.defaultProps = {
    style: undefined,
    textStyle:undefined,
    buttonTheme: 'Dark'
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: 40
    },
    text: {
        fontFamily: "HP Simplified",
    },
    contDark: {
        backgroundColor: Colors.bgPrimaryDark
    },
    textDark: {
        color: Colors.bodyPrimaryVarient,
    },
    constLight: {
        backgroundColor: Colors.bgSecondaryLight,
    },
    constVarient: {
        backgroundColor: Colors.bgVarient,
    }, 
    textLight: {
        color: Colors.bodyPrimaryLight,
    }
})

//   onPress: Function,
        // <TouchableHighlight
        // onPress={props.onPress}
        // style={StyleSheet.flatten([styles.container, props.style])}
        // >
        // <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.children}</Text>
        // </TouchableHighlight>