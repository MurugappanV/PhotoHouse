/**
 * Different types of Text
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, Platform, Text } from 'react-native'
import {Colors, Metrics} from '../../asset'

type Props = {
    text: string,
    style?: number | Object | Array<number>,
    textProps?: Object
}

export function ExtraLargeText(props: Props) {
    return <Text {...props.textProps} style={StyleSheet.flatten([styles.extralargeText, props.style])}>{props.text}</Text>
}

export function LargeText(props: Props) {
    return <Text {...props.textProps} style={StyleSheet.flatten([styles.largeText, props.style])}>{props.text}</Text>
}

export function MediumText(props: Props) {
    return <Text {...props.textProps} style={StyleSheet.flatten([styles.mediumText, props.style])}>{props.text}</Text>
}

export function SmallText(props: Props) {
    return <Text {...props.textProps} style={StyleSheet.flatten([styles.smallText, props.style])}>{props.text}</Text>
}

ExtraLargeText.defaultProps = {
    style: undefined,
    text: ""
}

LargeText.defaultProps = {
    style: undefined,
    text: ""
}

MediumText.defaultProps = {
    style: undefined,
    text: ""
}

SmallText.defaultProps = {
    style: undefined,
    text: ""
}

const styles = StyleSheet.create({
    extralargeText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.EXTRA_LARGE_TEXT_SIZE,
        fontFamily: "HP Simplified",
    },
    largeText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.LARGE_TEXT_SIZE,
    },
    mediumText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.MEDIUM_TEXT_SIZE,
        lineHeight: 25
    },
    smallText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.SMALL_TEXT_SIZE,
    }
})