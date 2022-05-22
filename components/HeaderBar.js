// @flow
import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {COLORS, FONTS, icons, SIZES} from "../constants";

const HeaderBar = ({title, leftOnPressed, right, containerStyle}) => {
    return (
        <View
            style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                ...containerStyle
            }}>
            {/*BACK*/}

            <View style={{alignItems: "flex-start"}}>
                <TouchableOpacity
                    onPress={leftOnPressed}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.transparentBlack
                    }}>

                    <Image source={icons.left_arrow} resizeMode={"contain"} style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}/>

                </TouchableOpacity>
            </View>

            {/*TITLE*/}
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>

                <Text style={{
                    color: COLORS.white, ...FONTS.h3
                }}>{title}</Text>
            </View>

            {/*SETTINGS*/}
            <TouchableOpacity style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: right ? COLORS.transparentBlack : null
            }}>


                {
                    right && <Image source={icons.settings} resizeMode={"contain"} style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}/>
                }


            </TouchableOpacity>

        </View>
    );
};

export default HeaderBar
