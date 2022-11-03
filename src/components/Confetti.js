import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

export default class Confetti extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zIndex: -1,
      intrevalTimer: null,
    };
  }

  componentDidMount() {
    this.onClickCustom();
    this.setState({
      intrevalTimer: setInterval(() => {
        this.onClickCustom();
      }, 2500),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.intrevalTimer);
  }

  getInstance = (instance) => {
    this.confetti = instance;
  };

  zIndex() {
    this.setState({ zIndex: 2000 });
  }

  onClickDefault = () => {
    // starting the animation
    this.confetti();
    this.zIndex();
  };

  onClickCustom = () => {
    // starting the animation with custom settings
    this.confetti({ particleCount: Math.ceil(Math.random() * 1000), spread: 180 });
    this.zIndex();
  };

  onClickCallback = () => {
    // calling console.log after the animation ends
    this.confetti().then(() => {
      console.log("do something after animation");
    });
    this.zIndex();
  };

  onClickReset = () => {
    // cleaning the canvas
    this.confetti.reset();
  };

  render() {
    return (
      <ReactCanvasConfetti
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          maxWidth: "598px",
          zIndex: this.state.zIndex,
        }}
        refConfetti={this.getInstance}
      />
    );
  }
}
