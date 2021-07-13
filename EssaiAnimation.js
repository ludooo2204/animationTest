import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  useWindowDimensions,
  Pressable,
} from 'react-native';
const EssaiAnimation = () => {
  const [positionX, setPositionX] = useState(null);
  const [positionY, setPositionY] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const translationX = useRef(new Animated.Value(0)).current;
  const translationY = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  useEffect(() => {
    console.log('positionX ', positionX);
    console.log('positionY ', positionY);
  }, [isAnimated]);

  const rotationValue = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translationXValue = translationX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowWidth-150],
  });
  const translationYValue = translationY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight-100],
  });
  const touch = () => {
    if (isAnimated) {console.log("stop!!!!")
    Animated.timing(translationX).stop()
    Animated.timing(translationY).stop()
  
  } else {
    setIsAnimated(true);
    Animated.loop(
    Animated.sequence([
      Animated.timing(translationX, {
        toValue: 1,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(translationY, {
        toValue: 1,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(translationX, {
        toValue: 0,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(translationY, {
        toValue:0,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      
      // Animated.timing(rotation, {
      //   toValue: Math.random(),
      //   useNativeDriver: true,
      // }),
    ])).start(() => setIsAnimated(false));
  }
    // translation.setValue(0)
  };
  translationX.addListener(e => {
    setPositionX(e.value);
  });
  translationY.addListener(e => {
    setPositionY(e.value);
  });
  return (
    <Animated.View
      style={{
        width: 150,
        height: 150,
        backgroundColor: 'tomato',
        borderRadius:20,
        transform: [
          {translateX: translationXValue},
          {translateY: translationYValue},
          {rotateZ: rotationValue},
        ],
      }}>
      <Pressable onPress={touch}>
        <View
          style={{
            width: 150,
            height: 150,
          }}>
          <Text style={{fontSize:40}}>{Math.round(windowWidth*(positionX*100)/100)}</Text>
          <Text style={{fontSize:40}}>{Math.round(windowHeight*(positionY*100)/100)}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default EssaiAnimation;
