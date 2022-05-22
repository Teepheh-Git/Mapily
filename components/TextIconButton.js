// @flow
import React from 'react';
import {Image, Text, TouchableOpacity} from "react-native";
import {COLORS, FONTS, SIZES} from "../constants";

const TextIconButton = ({label, icon, customContainerStyle, customLabelStyle, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle
            }}>

            <Text style={{
                marginRight: SIZES.base, ...FONTS.h2, ...customLabelStyle
            }}>{label}</Text>

            <Image source={icon} style={{
                width: 25,
                height: 25
            }}/>

        </TouchableOpacity>
    );
};

export default TextIconButton
