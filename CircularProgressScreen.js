import React,{useState} from 'react';
import CircularProgress from './CircularProgress';
import styled from 'styled-components';
import { Pressable } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function CircularProgressScreen() {
    const [progress, setProgress] = useState(0)
    const handlePress=()=>{
        console.log("pressed!")
        setProgress(Math.random()*100)
    }
  return (
    <Container>
      <Pressable onPress={handlePress}><CircularProgress progress={progress} size={300} /></Pressable>
    </Container>
  );
}