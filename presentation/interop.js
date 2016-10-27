
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
  <Slide>
    <Title>
      Promises ↔️ Callbacks
    </Title>
    <CodePane
      textSize="1.5rem"
      lang="js"
      source={`function prom2cb(prom, done) {
  prom.then(
    value => done(null, value),
    err => done(err)
  )
}
function cb2prom(fn) {
  return new Promise((resolve, reject) => {
    fn((err, value) => err ? reject(err) : resolve(value))
  })
}
`} />
  </Slide>,

  <Slide>
    <Title>
      CSP ↔️ Callbacks
    </Title>
    <CodePane
      textSize="1.2rem"
      lang="js"
      source={`function cb2csp(fn) {
  const chan = chan()
  fn((err, result) => {
    err ? chan.pushAsync(err) : chan.pushAsync(result)
    chan.close()
  })
  return chan
}
function csp2cb(chan, done) {
  chan.takeAsync(value => {
    if (value instanceof Error) {
      done(value)
    } else {
      done(null, value)
    }
  })
}`} />
  </Slide>,

  <Slide>
    <Title>
      CSP ↔️ Observables
    </Title>
    <CodePane
      textSize="1.2rem"
      lang="js"
      source={`function csp2obs(chan) {
  const sub = new PublishSubject()
  go(function* () {
    let val
    while ((val = yield chan.pull()) !== chan.CLOSED) {
      (val instanceof Error) ? sub.onError(val) : sub.onNext(val)
    }
    sub.onCompleted()
  })
  return obs
}
function obs2csp(obs, chan) {
  obs.subscribe(
    value => chan.pushAsync(value),
    error => chan.pushAsync(error),
    () => chan.close()
  )
}
`} />
  </Slide>,



]
