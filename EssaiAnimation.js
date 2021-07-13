import React, {useEffect, useRef} from 'react';
import {Animated, View, Text, Pressable} from 'react-native';
const EssaiAnimation = () => {
  const translation = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.loop(
    Animated.parallel([
      Animated.timing(translation, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ])).start();
  }, []);
  const rotationValue = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const translationValue = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [0,200],
  });
  const coucou=()=>{
      console.log("coucou")
      translation.setValue(0)
  }

  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
            {translateX: translationValue}, 
            {rotateZ: rotationValue}
        ],
      }}
    >
        <Pressable onPress={coucou}>
            <View style={{
                 width: 100,
        height: 100,}}
        ></View>
        </Pressable>
    </Animated.View>  );
};

export default EssaiAnimation;
