
export default () => [
  <Slide transition={["zoom"]} bgColor="primary">
    <Heading size={1} fit caps lineHeight={1} textColor="black">
      Spectacle
    </Heading>
    <Heading size={1} fit caps>
      A ReactJS Presentation Library
    </Heading>
    <Heading size={1} fit caps textColor="black">
      Where You Can Write Your Decks In JSX
    </Heading>
    <Link href="https://github.com/FormidableLabs/spectacle">
      <Text bold caps textColor="tertiary">View on Github</Text>
    </Link>
    <Text textSize="1.5em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>
  </Slide>,

  <Slide transition={["slide"]} bgColor="black" notes="You can even put notes on your slide. How awesome is that?">
    <Image src={images.kat.replace("/", "")} margin="0px auto 40px" height="293px"/>
    <Heading size={2} caps fit textColor="primary" textFont="primary">
      Wait what?
    </Heading>
  </Slide>,

  <Slide transition={["zoom", "fade"]} bgColor="primary" notes="<ul><li>talk about that</li><li>and that</li></ul>">
    <CodePane
      lang="jsx"
      source={require("raw!../assets/deck.example")}
      margin="20px auto"
    />
  </Slide>
]

