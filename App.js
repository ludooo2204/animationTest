import * as React from 'react';
import {
  Animated,
  Pressable,
  Easing,
  useWindowDimensions,
  View,
  Text,
  UIManager,
  findNodeHandle,
} from 'react-native';

export default function App() {
  // On récupère la taille de l'écran que l'on arrondit à l'entier.
  const windowHeight = Math.round(useWindowDimensions().height);
  const windowWidth = Math.round(useWindowDimensions().width);
  const viewRef = React.useRef(null);
  // On définit une référence de valeur animée qui commence à 0
  const positionX = React.useRef(new Animated.Value(0)).current;
  const positionY = React.useRef(new Animated.Value(0)).current;
  const AnimPressable = Animated.createAnimatedComponent(Pressable);
  //   React.useEffect(()=>{
  //   console.log("useefeect")
  //   viewRef.current.measure((x,y,width,heigth,pageX,pageY)=>console.log(x,y,width,heigth,pageX,pageY))

  // },[]
  //   )
  const goAnim = () => {
    console.log('anim:');
    viewRef.current.measure((x, y, width, heigth, pageX, pageY) =>
      console.log(x, y, width, heigth, pageX, pageY),
    );

    //  UIManager.measure(findNodeHandle(viewRef))

    // console.log(refView.measure((fx)=>{
    //   console.log(fx)
    // }))
    // On anime notre valeur jusqu'à la hauteur de la fenetre
    Animated.timing(positionX, {
      toValue: Math.random(),
      duration: 3000, // Durant 10 secondes
      useNativeDriver: true, // Cela sera abordé plus tard
      easing: Easing.bounce,
    }).start();
    Animated.timing(positionY, {
      toValue: Math.random(),
      duration: 3000, // Durant 10 secondes
      useNativeDriver: true, // Cela sera abordé plus tard
      easing: Easing.bounce,
    }).start(() => {
      viewRef.current.measure((x, y, width, heigth, pageX, pageY) =>
        console.log(x, y, width, heigth, pageX, pageY),
      );
    });
  };

  const reset = () => {
    console.log('reset');
    heightAnim.setValue(0);
  };
  return (
    <View>
      <AnimPressable onPress={goAnim}
        ref={viewRef}
        style=
        {[
          {backgroundColor: 'red', width: 200, height: 200},
          {
            transform: [
              {
                translateX: positionX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, windowWidth - 200],
                }),
              },
              {
                translateY: positionY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, windowHeight - 200],
                }),
              },
            ],
          },
        ]}
        >
      </AnimPressable>
    </View>
  );
}
