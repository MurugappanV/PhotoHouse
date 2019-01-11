/**
 * Toggle button
 * Author : Murugappan V
 * Date   : 5 oct 2018
 * @flow
 */

import React, {PureComponent} from 'react'
import { StyleSheet, View, Animated, Easing, TouchableOpacity } from 'react-native'
import { MediumText } from '../Texts';
import { Colors } from '../../asset';

type Props = {
    onPress: Function,
    style?: number | Object | Array<number>,
    width: number,
    height: number
}

type State = {
    on: boolean,
}

export class ToggleBtn extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    animValue: Animated = null

    constructor(props: Props) {
        super(props)
        this.state = {on: true}
        this.animValue = new Animated.Value(1)
    }

    onPress = () => {
        this.setState({on: !this.state.on})
        this.toggle(!this.state.on)
        this.props.onPress(!this.state.on)
    }

    toggle = (on: boolean) => {
        const val = on ? 1 : 0
        Animated.timing(
            this.animValue,
            {
                toValue: val,
                duration: 300,
                easing: Easing.linear
            }
        ).start()
    }


    render() {
        const {width, height, style} = this.props
        const toggleItemWidth = width / 2;
        const x = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-toggleItemWidth, 0]
        })
        return <TouchableOpacity onPress={this.onPress} style={StyleSheet.flatten([{width: width}, styles.touchContainer, style])}>
            <Animated.View style={[styles.container, {transform: [{translateX: x}]}]}>
                <View style={[styles.innerContainer, styles.onContainer, {height: height, width: toggleItemWidth}]}>
                    <MediumText style={{color: Colors.bodyPrimaryLight}} text={"ON"}/>
                </View>
                <View style={[styles.innerContainer, styles.emptyContainer, {height: height, width: toggleItemWidth}]}>
                    <MediumText text={""}/>
                </View>
                <View style={[styles.innerContainer, styles.offContainer, {height: height, width: toggleItemWidth}]}>
                    <MediumText style={{color: Colors.bodyPrimaryDark}} text={"OFF"}/>
                </View>
            </Animated.View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    touchContainer: {
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: Colors.bgSecondaryDark
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    onContainer: {
        textAlign: 'center',
        backgroundColor: Colors.bgPrimaryDark,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    offContainer: {
        textAlign: 'center',
        backgroundColor: Colors.bgSecondaryLight,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    emptyContainer: {
        backgroundColor: Colors.bgPrimaryLight
    }
})