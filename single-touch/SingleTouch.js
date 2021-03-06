import React, { Component } from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { GameLoop } from "react-native-game-engine";
import Worm from "./worm";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default class SingleTouch extends Component {
  constructor() {
    super();
    this.state = {
      x: WIDTH / 2,
      y: HEIGHT / 2,
    };
  }

  onUpdate = ({ touches }) => {
  if (touches[0])  console.log(touches)
    let move = touches.find(x => x.type === "move");
    if (move) {
      this.setState({
        x: this.state.x + move.delta.pageX,
        y: this.state.y + move.delta.pageY
      });
    }
  };

  render() {
    return (
      <GameLoop style={styles.container} onUpdate={this.onUpdate}>

        <StatusBar hidden={true} />

        <Worm {...this.state} />

      </GameLoop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
