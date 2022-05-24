// @flow
import React from 'react';
import {Image, View} from "react-native";
import {icons} from "../constants";

const Rating = ({containerStyles, rate}) => {

    const starComponent = []

    for (let i = 0; i < rate; i++) {
        starComponent.push(
            <Image
                key={`full-${i}`}
                source={icons.star}
                style={{
                    marginLeft: i === 0 ? 0 : 5,
                    width: 15,
                    height: 15
                }}
            />
        )
    }


    return (
        <View style={{
            flexDirection: 'row',
            ...containerStyles

        }}>
            {starComponent}
        </View>
    );
};

export default Rating
