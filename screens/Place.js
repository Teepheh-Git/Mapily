import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ImageBackground, Platform, Text, View} from 'react-native';
import {HeaderBar, Rating, TextButton, TextIconButton} from "../components";
import {COLORS, FONTS, icons, SIZES} from "../constants";
import SlidingUpPanel from "rn-sliding-up-panel";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import mapStyle from "../styles/MapStyle";

const Place = ({navigation, route}) => {

    // console.log(route.params, "PPPP")
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [allowDragging, setAllowDragging] = useState(true);

    const _draggedValue = useRef(new Animated.Value(0)).current


    let _panel = useRef(null)

    useEffect(() => {
        let {selectedPlace} = route.params
        setSelectedPlace(selectedPlace)

        // listener that will disable panel dragging whenever the mapview is shown
        _draggedValue.addListener((valueObj) => {
            if (valueObj.value > SIZES.height) {
                setAllowDragging(false)
            }
        })


        return () => {
            _draggedValue.removeAllListeners()
        }
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

    function renderMap() {
        return (
            <SlidingUpPanel
                ref={c => (_panel = c)}
                draggableRange={{top: SIZES.height + 120, bottom: 120}}
                snappingPoints={[SIZES.height + 120]}
                height={SIZES.height + 120}
                allowDragging={allowDragging}
                animatedValue={_draggedValue}
                onBottomReached={() => setAllowDragging(true)}
                friction={0.7}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "transparent"
                }}>

                    {/*Panel header*/}
                    <View style={{
                        height: 120,
                        top: 40,

                        backgroundColor: "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                        <Image source={icons.up_arrow} style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}/>

                        <Text style={{
                            flex: 1,
                            color: COLORS.white,
                            ...FONTS.h3,
                        }}>SWIPE UP FOR DETAILS</Text>


                    </View>
                    {/*Panel details*/}


                    <View style={{
                        flex: 1,
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>


                        <MapView
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            customMapStyle={mapStyle}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={selectedPlace?.mapInitialRegion}
                        >

                            {selectedPlace?.hotels.map((hotel, index) => (
                                <Marker key={index} coordinate={hotel.latlng} identifier={hotel.id} onPress={() => {
                                    setSelectedHotel(hotel)
                                }}>

                                    <Image
                                        source={selectedHotel?.id === hotel.id ? icons.bed_on : icons.bed_off}
                                        resizeMode={"contain"}
                                        style={{
                                            width: 50,
                                            height: 50
                                        }}
                                    />

                                </Marker>
                            ))}


                        </MapView>
                        {/*Header*/}

                        <HeaderBar

                            title={selectedPlace?.name}
                            leftOnPressed={() => _panel.hide()}
                            right={true}
                            containerStyle={{
                                position: "absolute",
                                top: SIZES.padding * 2
                            }}
                        />

                        {/*Hotel Details*/}

                        {selectedHotel && <View style={{
                            position: "absolute",
                            bottom: 30,
                            left: 0,
                            right: 0,
                            padding: SIZES.radius
                        }}>

                            <Text style={{
                                color: COLORS.white, ...FONTS.h1
                            }}>
                                Hotels in {selectedPlace?.name}
                            </Text>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius,
                                padding: SIZES.radius,
                                borderRadius: 15,
                                backgroundColor: COLORS.transparentBlack1
                            }}>

                                <Image
                                    source={selectedHotel?.image}
                                    resizeMode={"cover"}
                                    style={{
                                        width: 90,
                                        height: 120,
                                        borderRadius: 15,
                                    }}
                                />
                                <View style={{
                                    flex: 1,
                                    marginLeft: SIZES.radius,
                                    justContent: "center",
                                }}>

                                    <Text style={{
                                        color: COLORS.white,
                                        ...FONTS.h3,

                                    }}>{selectedHotel?.name}

                                    </Text>

                                    <Rating
                                        containerStyles={{
                                            marginTop: SIZES.base,
                                        }}
                                        rate={selectedHotel?.rate}
                                    />

                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: SIZES.base
                                    }}>

                                        <TextButton
                                            label={"Details"}
                                            customContainerStyle={{
                                                marginTop: SIZES.base,
                                                height: 45,
                                                width: 100
                                            }}
                                            customLabelStyle={{
                                                ...FONTS.h3
                                            }}
                                            onPress={() => {
                                            }}
                                        />

                                        <View style={{
                                            flex: 1,
                                            alignItems: "flex-end",
                                            justifyContent: "center"
                                        }}>

                                            <Text style={{
                                                color: COLORS.lightGray,
                                                ...FONTS.body5,
                                                fontSize: Platform.OS === 'ios' ? SIZES.body4 : SIZES.body5
                                            }}>
                                                from $ {selectedHotel?.price}/ night
                                            </Text>

                                        </View>

                                    </View>

                                </View>

                            </View>

                        </View>}


                    </View>

                </View>


            </SlidingUpPanel>
        )
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {renderPlace()}
            {renderMap()}
        </View>
    )
}

export default Place;
