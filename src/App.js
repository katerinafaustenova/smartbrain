import React from "react";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "286035f391eb4d6e97698a28c2c347d0",
});

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
    };
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  onSubmit = () => {
    this.setState({
      imgUrl: this.state.input,
    });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({
      box: box,
    });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imgUrl={this.state.imgUrl} box={this.state.box} />
      </div>
    );
  }
}

export default App;
