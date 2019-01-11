/**
 * Filter pop up 
 * Author : Murugappan V
 * Date   : 12 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, Modal, TouchableOpacity, View } from 'react-native'
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth, ScaleSampDesgHeight} from '../../asset'
import { MediumText, SmallText } from '../../components'

type Props = {
    style?: number | Object | Array<number>,
    visible: Boolean,
    onDone: Function,
    onClose: Function,
    renderItem: any,
    btnText: string,
    btnAlignStart: boolean 
}

export function ModalComp(props: Props) {
    const {btnAlignStart, visible, onDone, renderItem, onClose, btnText} = props
    return <Modal  animationType="slide" transparent={true} visible={visible} onRequestClose={() => {}}>
        <View style={styles.container} >
            <TouchableOpacity onPress={onClose} style={{flex:1, backgroundColor: 'transparent'}}/>
            <View style={StyleSheet.flatten([styles.subContainer, props.style])}>
                <View style={styles.header}>
                    <TouchableOpacity style={btnAlignStart ? styles.applyStart : styles.applyEnd} onPress={onDone}>
                        <SmallText style={styles.applyText} text={btnText}/>
                    </TouchableOpacity>
                </View>
                {renderItem()}
            </View>
        </View>
    </Modal>
}

ModalComp.defaultProps = {
    style: undefined,
    visible: false,
    btnAlignStart: false 
}

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgTransparent,
    },
    subContainer: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors.bgPrimaryDark,
        width: ScalePerctFullWidth(100),
        height: ScaleSampDesgHeight(60)
    },
    applyEnd: {
        alignSelf: 'flex-end',
        padding: 20
    },
    applyStart: {
        alignSelf: 'flex-start',
        padding: 20
    },
    applyText: {
        color: Colors.bodyPrimaryLight,
        fontFamily: "HP Simplified"
    }
})