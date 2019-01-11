/**
 * Search Input
 * Author : Murugappan V
 * Date   : 10 Oct 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, View, Image, TextInput } from 'react-native'
import { Colors, Metrics, Images, ScalePerctFullWidth, ScaleSampDesgHeight } from '../../asset'
import { ImageBtn } from '../Button';
import { Line } from '../Common';

type Props = {
    onChangeText: Function,
    onSubmit: Function,
    onClose: Function,
    placeHolder?: string,
    textContentType?: string,
    style?: number | Object | Array<number>,
    imageStyle?: number | Object | Array<number>,
    inputStyle?: number | Object | Array<number>,
    text: string,
    returnKey?: string
}

export function SearchInput(props: Props) {
    return <View>
        <View style={StyleSheet.flatten([styles.container, props.style])}>
            <Image tintColor={Colors.bodyPrimaryVarient} style={StyleSheet.flatten([styles.image, props.imageStyle])} source={Images.searchImg}/>
            <TextInput
                style={StyleSheet.flatten([styles.input, props.inputStyle])} 
                onChangeText={(text) => props.onChangeText(text)}
                underlineColorAndroid="transparent"
                selectionColor='black'
                returnKeyType={props.returnKey}
                placeholder={props.placeHolder}
                textContentType={props.textContentType}
                secureTextEntry={props.textContentType=='password'? true:false}
                placeholderTextColor={Colors.bodySecondaryLight}
                value={props.text}
                onSubmitEditing={props.onSubmit}
                autoFocus={true}
            />
            <ImageBtn tintColor={Colors.bodyPrimaryVarient} onPress={props.onClose} style={styles.close} imgStyle={styles.closeImage} source={Images.closeImg}/>
        </View>
        <Line style={styles.line}/>
    </View>
}

SearchInput.defaultProps = {
    style: undefined,
    imageStyle: undefined,
    inputStyle:undefined,
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
        width: ScaleSampDesgHeight(20),
        height: ScaleSampDesgHeight(20),
        resizeMode: 'contain',
        flex: 2
    },
    close: {
        flex: 2
    },
    closeImage: {
        width: ScaleSampDesgHeight(16),
        height: ScaleSampDesgHeight(16),
        resizeMode: 'contain'
    },
    input: {
        fontSize: Metrics.MEDIUM_TEXT_SIZE,
        flex: 8,
        fontFamily: "HP Simplified Light"
    },
    line: {
        borderBottomColor: Colors.bodyPrimaryVarient,
        borderBottomWidth: 1,
        width: ScalePerctFullWidth(90),
        alignSelf: 'center'
    }
})