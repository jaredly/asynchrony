
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
    <BigTitle>What are these things?</BigTitle>
  </Slide>,

  <Slide>
    <Title>Callbacks</Title>
    <List>
      <ListItem>called with <Code>(err or null, result)</Code></ListItem>
      <ListItem>only called once</ListItem>
    </List>
  </Slide>,

  <Slide>
    <Title>Callbacks</Title>
    <CodePane
      textSize="1.5rem"
      lang="javascript"
      source={`fs.readFile("someFile.txt", (err, text) => {
  // handle the error if it exists
  if (err) {
    console.error('failed to read file')
    process.exit(1)
  }
  getWebSiteText("http://google.com", (err, html) => {
    if (err) throw err
    // otherwise we should have a value!
    console.log(text, html)
  })
})`} />
  </Slide>,

  <Slide notes={`
    it's the newfangled way to write javascript
    because promises are always-caching, it's hard to know whether an error is "just being saved for later"
    so debuggability suffers, if you can't pause on uncaught promise-based errors
    - this is better in chrome now, but nodejs still suffers :/
`}>
    <Title>Promises</Title>
    <List>
      <ListItem>Caches the result / error</ListItem>
      <ListItem>Collapses returned promises</ListItem>
      <ListItem>Eats errors for lunch</ListItem>
    </List>
  </Slide>,

  <Slide>
    <Title>Promises</Title>
    <CodePane
      textSize="1.5rem"
      lang="javascript"
      source={`readFileAsPromised("someFile.txt")
  .then(text => {
    return getWebSiteAsPromised("http://google.com")
      .then(html => console.log(text, html))
  })
  // one of the two things failed
  .catch(err => console.error('bad news'))
`} />
  </Slide>,

  <Slide notes={`
`}>
    <Title>Async/Await</Title>
    <List>
      <ListItem>More ergonomic</ListItem>
      <ListItem>Less nesting required</ListItem>
      <ListItem>Now in Chrome Beta!</ListItem>
    </List>
  </Slide>,

  <Slide notes={`
`}>
    <Title>Async/Await</Title>
    <CodePane
      textSize="1.5rem"
      lang="javascript"
      source={`(async function() {
  const text = await readFileAsPromised("someFile.txt")
  const html = await getWebSiteAsPromised("http://google.com")
  console.log(text, html)
})()
  // gotta handle errors or they disappear into the abyss
  .catch(err => console.error('bad news'))
`} />
  </Slide>,

  <Slide notes={` `}>
    <Title>Observables</Title>
    <List>
      <ListItem>A stream of values</ListItem>
      <ListItem>Lots of built-in operators</ListItem>
      <ListItem>Operations work over stream as a whole</ListItem>
    </List>
  </Slide>,

  <Slide>
    <Title>Observables</Title>
    <CodePane
      textSize="1.5rem"
      lang="javascript"
      source={`// transform the first item in 'problemInfoObs' specially
taskDataObs
  .switchMap(taskData -> {
    return problemInfoObs.take(1)
      .switchMap(initialInfo -> {
        const firstCommand =
              buildFirstCommand(taskData, initialInfo)
        return problemInfoObs.skip(1)
          .switchMap(problemInfo ->
              buildLoadNextProblemCommand(problemInfo))
          .startWith(firstCommand)
      })
  })
`} />
  </Slide>,

  <Slide notes={` `}>
    <Title fit>Communicating Sequential Processes</Title>
    <List>
      <ListItem>Passing data between ~threads</ListItem>
      <ListItem>Take & Put *blocking* the current thread</ListItem>
      <ListItem>Handle each value individually</ListItem>
    </List>
  </Slide>,

  <Slide>
    <Title fit>Communicating Sequential Processes</Title>
    <CodePane
      textSize="1.5rem"
      lang="javascript"
      source={`const output = chan()
go(function*() {
  const taskData = yield taskDataChan.take()
  const initialInfo = yield problemInfoChan.take()
  yield output.put(buildFirstCommand(taskData, initialInfo))
  let problemInfo
  while ((problemInfo = yield problemInfoChan.take())
         !== csp.CLOSED) {
    yield output.put(buildLoadNextProblemCommand(problemInfo))
  }
  output.close()
})
return output
`} />
  </Slide>,

]
