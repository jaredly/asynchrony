// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  jared: require("../assets/jared.png"),
  ka: require("../assets/ka.png"),
  chart: require("../assets/chart.png"),
};

preloader(images);

const theme = createTheme({
  // primary: "#ff4081"
});


import slides from './slides'



export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} progress="number" transitionDuration={500}>
          {slides(images)}
        </Deck>
      </Spectacle>
    );
  }
}
