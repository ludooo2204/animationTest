import React,{useRef,useEffect} from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 0,
  textColor,
  max = 100
}) {
  const animated = useRef(new Animated.Value(0)).current;
  console.log(animated)
  const circleRef = useRef(null);
  // console.log("circleRef")
  // console.log(circleRef)
  const inputRef = useRef(null);
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const animation = (toValue) => {
    console.log("anim")
    return Animated.timing(animated, {
      // delay: 5000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };
  
  useEffect(() => {
    animation(percentage);
   
      const maxPerc = 100 * percentage / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      console.log("animated")
      console.log(animated)
      animated.addListener(v=>{
        // if (circleRef){
          console.log("toto")
          circleRef.current.setNativeProps({strokeDashoffset},)
        // }
      })
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          {console.log(circumference)}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2, color: textColor ?? color },
          styles.text,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});
