import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Colors, Metrics, ScalePerctFullWidth, ScalePerctFullHeight } from '../../asset';
import { MediumText } from '../Texts';
import { Line } from '../Common';

export class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioButtons: this.validate(this.props.data),
        };
    }

    validate(data) {
        data.map(e => {
            e.label = e.label ? e.label : 'label';
            e.value = e.value ? e.value : e.label;
        });
        return data;
    }

    onPress = (value, label) => {
        this.props.onPress(value, label)
    };

    render() {
        return (
            <ScrollView>
                <View style={[styles.container, { flexDirection: 'column' }]}>
                    {this.state.radioButtons.map(data => (
                        <RadioButton
                            key={data.value}
                            data={data}
                            color={this.props.color}
                            size={this.props.size}
                            selectedValue={this.props.value}
                            onPress={this.onPress}
                        />
                    ))}
                </View>
            </ScrollView>
        );
    }
}

class RadioButton extends Component {
    render() {
        const { data, color, size, selectedValue } = this.props;
        return (
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => { this.props.onPress(data.value, data.label); }}>
                    <View
                        style={[
                            styles.border,
                            {
                                borderColor: data.value == selectedValue ? color : '#444',
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                            },
                        ]}>
                        {data.value == selectedValue &&
                            <View
                                style={{
                                    backgroundColor: color,
                                    width: size / 2,
                                    height: size / 2,
                                    borderRadius: size / 4,
                                }}
                            />
                        }
                    </View>
                    <MediumText style={styles.buttontext} text={data.label} />
                </TouchableOpacity>
                <Line style={[{ marginLeft: 45 + size }, styles.line]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: Metrics.DEFAULT_PADDING
    },
    border: {
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        paddingTop: ScalePerctFullHeight(1.5),
        paddingBottom: ScalePerctFullHeight(1.5),
        width: ScalePerctFullWidth(100)
    },
    buttontext: {
        alignSelf: 'center',
        marginLeft: 35,
        color: Colors.bodyPrimaryDark
    },
    line: {
        alignSelf: 'stretch',
        borderBottomWidth: 0.5
    }

});