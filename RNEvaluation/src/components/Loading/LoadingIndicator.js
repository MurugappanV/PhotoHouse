/**
 * Loading indicator component with large spinner
 * Author : Murugappan V
 * Date   : 22 Oct 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import {Colors, Metrics, ScaleSampDesgHeight, ScaleSampDesgWidth} from '../../asset'
import {LargeText} from '../Texts'

type Props = {
    style?: number | Object | Array<number>,
}

const renderLoading = () => {
    return <ActivityIndicator size="large" color={Colors.bodySecondaryDark} />
}

export function LoadingIndicator(props: Props) {
    return <View style={StyleSheet.flatten([styles.container, props.style])}>
        {renderLoading()}
    </View>
}

LoadingIndicator.defaultProps = {
    style: undefined,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
})