import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {HeaderBar, TextIconButton} from "../components";
import {COLORS, FONTS, icons, SIZES} from "../constants";

const Place = ({navigation, route}) => {

    // console.log(route.params, "PPPP")
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        let {selectedPlace} = route.params

        setSelectedPlace(selectedPlace)
    }, [])


    function renderPlace() {
        return (
            <ImageBackground source={selectedPlace?.image} style={{
                width: "100%",
                height: "100%"
            }}>

                <HeaderBar containerStyle={{
                    marginTop: SIZES.padding * 2
                }} leftOnPressed={() => navigation.goBack()}/>


                <View style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'flex-end',
                    marginBottom: 100
                }}>

                    {/*Name & ratings*/}

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-between',
                    }}>

                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.largeTitle,
                        }}> {selectedPlace?.name}</Text>


                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h3,
                            }}> {selectedPlace?.rate}</Text>

                            <Image source={icons.star} style={{
                                width: 20,
                                height: 20
                            }}/>


                        </View>
                    </View>


                    {/*desc section*/}

                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.body3,
                    }}> {selectedPlace?.description}</Text>

                    {/*text icon button*/}

                    <TextIconButton customContainerStyle={{
                        marginTop: SIZES.padding
                    }} icon={icons.aeroplane} label={"Book a flight"}

                                    onPress={() => console.log("Book a flight")}
                    />

                </View>

            </ImageBackground>
        )
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {renderPlace()}
        </View>
    )
}

export default Place;
