import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import FaceRecoginition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "286035f391eb4d6e97698a28c2c347d0"
});

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: ""
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      function(err) {
        // there was an error
      }
    );
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
        <FaceRecoginition imgUrl={this.state.imgUrl} />
      </div>
    );
  }
}

export default App;
