/**
 * App Footer 
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Images, ScaleSampDesgHeight, ScalePerctFullWidth } from '../../asset'

type Props = {
    style?: number | Object | Array<number>
}

export function Footer(props: Props) {
    return <Image style={StyleSheet.flatten([styles.image, props.style])} source={Images.footerImg} />
}

Footer.defaultProps = {
    style: undefined
}

const styles = StyleSheet.create({
    image: {
        width: ScalePerctFullWidth(100),
        height: ScaleSampDesgHeight(60),
        resizeMode: 'stretch'
    }
})

//   onPress: Function,
        // <TouchableHighlight
        // onPress={props.onPress}
        // style={StyleSheet.flatten([styles.container, props.style])}
        // >
        // <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.children}</Text>
        // </TouchableHighlight>