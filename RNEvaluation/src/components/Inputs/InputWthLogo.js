/**
 * Inputs with logo
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, View, Image, TextInput } from 'react-native'
import { Colors, Metrics } from '../../asset'

type Props = {
    onChangeText: Function,
    onSubmit: Function,
    onRef: Function,
    placeHolder?: string,
    textContentType?: string,
    style?: number | Object | Array<number>,
    imageStyle?: number | Object | Array<number>,
    inputStyle?: number | Object | Array<number>,
    text: string,
    returnKey?: string,
    source: Object
}
// StyleSheet.flatten([ , props.inputStyle])
export function InputWthLogo(props: Props) {
    return <View style={StyleSheet.flatten([styles.container, props.style])}>
        <Image tintColor={Colors.bodySecondaryDark} style={StyleSheet.flatten([styles.image, props.imageStyle])} source={props.source} />
        <TextInput
            ref={refs => !!props.onRef && props.onRef(refs)}
            style={StyleSheet.flatten([styles.input , props.inputStyle])}
            onChangeText={(text) => props.onChangeText(text)}
            underlineColorAndroid="transparent"
            selectionColor='black'
            returnKeyType={props.returnKey}
            placeholder={props.placeHolder}
            textContentType={props.textContentType}
            secureTextEntry={props.textContentType == 'password' ? true : false}
            placeholderTextColor={Colors.bodySecondaryLight}
            value={props.text}
            onSubmitEditing={props.onSubmit}
        />
    </View>
}

InputWthLogo.defaultProps = {
    style: undefined,
    imageStyle: undefined,
    inputStyle: undefined,
    placeHolder: undefined,
    textContentType: 'none',
    returnKey: 'next'
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
        flex: 2,
        tintColor: Colors.bgSecondaryDark
    },
    input: {
        fontSize: Metrics.MEDIUM_TEXT_SIZE,
        flex: 8,
        fontFamily: "HP Simplified Regular"
    }
})