
import React from "react";
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
  Text,
  Code,

  Table,
  TableRow,
  TableHeaderItem,
  TableItem,
} from "spectacle";

import {SubTitle, BigTitle, Title} from './shared'

export default [
  <Slide >
    <BigTitle>Pros & Cons!</BigTitle>
  </Slide>,

  <Slide >
    <Title>Callbacks</Title>
      <div style={{textAlign: 'left'}}>
        <strong>Pros</strong>
        <List>
          <ListItem>
            Least powerful
          </ListItem>
        </List>
        <strong>Cons</strong>
        <List>
          <ListItem>
            No guarantees on # values
          </ListItem>
          <ListItem>
            Poor for coordinating multiple things
          </ListItem>
        </List>
    </div>
  </Slide>,

  <Slide >
    <Title>Promises (+async/await)</Title>
      <div style={{textAlign: 'left'}}>
        <strong>Pros</strong>
        <List>
          <ListItem>
            Caching
          </ListItem>
          <ListItem>
            Single value guarantee
          </ListItem>
        </List>
        <strong>Cons</strong>
        <List>
          <ListItem>
            No cancellation (yet)
          </ListItem>
          <ListItem>
            Poor debugging (but getting better)
          </ListItem>
        </List>
    </div>
  </Slide>,

  <Slide notes={`A year and a half ago, I got really excited about Observables,
after reading about CycleJS that Andre was developing, and I built a tool
to try to "visualize the stream" - and it had some cool qualities, but I ran
into some nontrivial problems, and I didn't end up pursuing it much farther.
(now tomorrow, Andre is going to talk about visualizing dataflow w/ Rx, so
maybe he's got the tool I want :D)
But this is still a huge issue, especially in combination with the next thing,
where I say it can be "hard to reason about"
- > now this term gets used a lot, and I want to dig into it a little big.
  to me "easy to reason about" means "
`}>
    <Title>Observables</Title>
      <div style={{textAlign: 'left'}}>
        <strong>Pros</strong>
        <List>
          <ListItem>
            Lots of complex operators
          </ListItem>
          <ListItem>
            Works w/ many values
          </ListItem>
          <ListItem>
            Thinking at a higher level (stream)
          </ListItem>
        </List>
        <strong>Cons</strong>
        <List>
          <ListItem>
            Lots of complex operators
          </ListItem>
          <ListItem>
            Poor debuggability
          </ListItem>
          <ListItem>
            Coordination/ordering can bite you
          </ListItem>
          <ListItem>
            Can be hard to reason about
          </ListItem>
        </List>
    </div>
  </Slide>,

  <Slide>
    <Title>"Easy to reason about?"</Title>
    <List>
      <Appear><ListItem>
        How easily can a developer familiar with the library/pattern but <strong>not</strong> with
        the project understand {"what's"} going on?
      </ListItem></Appear>
      <Appear><ListItem>
        How much effort required to get familiar with the library?
      </ListItem></Appear>
    </List>
  </Slide>,

  <Slide notes={`A year and a half ago, I got really excited about Observables,
after reading about CycleJS that Andre was developing, and I built a tool
to try to "visualize the stream" - and it had some cool qualities, but I ran
into some nontrivial problems, and I didn't end up pursuing it much farther.
But this is still a huge issue, especially in combination with the next thing,
where I say it can be "hard to reason about"
- > now this term gets used a lot, and I want to dig into it a little big.
  to me "easy to reason about" means "
`}>
    <Title fit>Communicating Sequential Processes</Title>
      <div style={{textAlign: 'left', marginTop: 40,}}>
        <strong>Pros</strong>
        <List>
          <ListItem>
            You control when data is processed
          </ListItem>
          <ListItem>
            Works w/ many values
          </ListItem>
          <ListItem>
            {"Sequential is what we're used to"}
          </ListItem>
        </List>
        <strong>Cons</strong>
        <List>
          <ListItem>
            No built-in cancellation
          </ListItem>
          <ListItem>
            No first-class error support
          </ListItem>
          <ListItem>
            ???
          </ListItem>
        </List>
    </div>
  </Slide>,

]
