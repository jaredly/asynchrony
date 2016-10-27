
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

import {Title, SubTitle} from './shared'

const replacements = {
  'y': '✅',
  'n': '🚫',
  'n~': '⚠️',
  'y~': '⚠️',
  '+': '✔',
  '~': '😕',
}

const replace = text => {
  for (let name in replacements) {
    if (name === text) return replacements[name]
  }
  return text
}

// What I really want is the ability to have these "caveats" show up beneath the table as I talk about things
const featureTable = {
  "Feature": ["Callbacks", "Promises", "Observables", "CSP"],
  "Num values": ["1~", "1", "*", "*"],
  "Num sources": ["1", "1", "*", "*"],
  "Num destinations": ['1~', '*', '*', '1~'],
    // you can set up event listeners, which multiplex
    // but observables are essentially event listeners gone wild
  "1st class errors": ["y~", "y", "y", "y~"],
    // callbacks -> node convention, error first; it's great, and it's pretty well followed now
    // CSP -> in javascript, you can convention `instanceof Error`, and in typed language you
    // can just wrap the data in a `Result`, which is fine
  'Caching': ['n', 'y', 'n~', 'n'],
    // default is no caching, you can use BehaviorSubject etc to cache
    // you can, but it's infrequent
}

const feature2 = {
  "Feature": ["Callbacks", "Promises", "Observables", "CSP"],
  'Push/pull': ['push', 'push', 'push', 'pull'],
    // Observables can do backpressure, some of them
  'Cancelable': ['n', 'y~', 'y', 'n'],
  'Private set': ['n', 'y', 'y', 'n'],
    // there's no separate "source" and "sink", it's all just a channel
    // whereas in Promises & Observables, it's "private set, public get"
    // With callbacks it's a rather weaker notion, but you function calls
    // only go one way.
    // another implication of this, is that consumption-side cancellation is a thing, but I think it would be weird?
    // all future puts will just return false -> so make sure to check for that?
  'When work happens': ['now', 'in a tic', 'on subscribe', 'on `take`'],
  'Mental overhead': ['😀', '😐', '😓', '❓'],
    // I haven't used CSP enough to judge here
  'Debuggability': ['😀', '😐', '😖', '❓'],
}

// TODO implement
const tableNotes = () => "TODO implement tableNotes"

const interopTable = {
  // from
  "":                 ["Callbacks", "Promises", "Observables", "CSP"],
  // to
  'Callbacks':        ['',          '~',              '+',           '+'],
  // for CSP, gotta write a function that says "just give me one"
  'Promises':   ['+',        '',               '~',           '~'],
  'Observables':      ['+',         '+',              '',            '+'],
  'CSP':              ['+',         '+',              '~',           ''],
}

const interops = {
  'Callback <-> CSP': [`
function cb2csp(fn) {
  const chan = chan(1)
  fn((err, result) => {
    err ? chan.pushAsync(err) : chan.pushAsync(result)
    chan.close()
  })
  return chan
}
`, `
function csp2cb(chan, done) {
  go(function* () {
    const value = yield chan.take()
    if (value instanceof Error) {
      done(value)
    } else {
      done(null, value)
    }
  })
}
`],

  'Callback <-> Observable': [`
function obs2cb(obs, done) {
  obs.single().subscribe(
    value => done(null, value),
    error => done(error)
  )
}
callbacky = (arg1, arg2, done) => {
  obs2cb(observably(arg1, arg2), done)
}
`, `
function cb2obs(callbacky) {
  return SignalProducer(producer => {
    callbacky((err, value) => {
      if (err) {
        producer.onError(err)
      } else {
        producer.onNext(value)
        producer.onCompleted()
      }
    })
  })
}
observably = (arg1, arg2) => {
  return cb2obs(done => callbacky(arg1, arg2, done))
}
`],

  'Callbacks <-> Promises': [`
function prom2cb(prom, done) {
  prom.then(
    value => done(null, value),
    err => done(err)
  )
}`,
// tell story about the api that called my "done" twice
`function prom2cb(prom, done) {
  prom.then(
    value => setImmediate(() => done(null, value)),
    err => setImmediate(() => done(err))
  )
}
`],

  'Promise <-> Observables': [`
function obs2prom(obs) {
  return new Promise((resolve, reject) => {
    obs.single().subscribe(
      value => resolve(value),
      error => reject(error)
    )
  })
}`, `
function prom2obs(prom) {
  return SignalProducer(producer => {
    prom.then(
      value => {
        producer.onNext(value)
        producer.onCompleted()
      },
      error => producer.onError(error)
    )
  })
}
`],

  'Promise <-> CSP': [`
function csp2prom(chan) {
  return new Promise((resolve, reject) => {
    go(function* () {
      const value = chan.take()
      if (value === csp.CLOSED) {
        reject(new Error("no value"))
      } else if (value instanceof Error) {
        reject(value)
      } else {
        resolve(value)
      }
    })
  })
}`, `
function prom2chan(prom) {
  const chan = csp.chan()
  prom.then(
    value => {
      chan.putAsync(value)
      chan.close()
    },
    error => {
      chan.putAsync(error)
      chan.close()
    }
  )
}
`],

  'Observable <-> CSP': [`
function csp2obs(chan) {
  const sub = new PublishSubject()
  go(function* () {
    let val
    while ((val = yield chan.take()) !== chan.CLOSED) {
      if (val instanceof Error) {
        sub.onError(val)
      } else {
        sub.onNext(val)
      }
    }
    sub.onCompleted()
  })
  return obs
}`, `
function obs2csp(obs, chan) {
  obs.subscribe(
    value => chan.pushAsync(value),
    error => chan.pushAsync(error),
    () => chan.close()
  )
}
`]

}

// " // '
const makeTable = (data, appear) => (
  <Table>
    <tbody>
      <TableRow >
        <TableItem>
          <strong>
          {Object.keys(data)[0]}
          </strong>
        </TableItem>
        {data[Object.keys(data)[0]].map(item => <TableItem
          key={item}
          padding={10}
        >
          <strong>{item}</strong>
        </TableItem>)}
      </TableRow>
      {Object.keys(data).slice(1).map(rowTitle => {
        const contents = <TableRow>
            <TableItem style={{height: 80}} textAlign="left">
              <Text bold style={{whiteSpace: 'nowrap'}}>{rowTitle}</Text>
            </TableItem>
            {data[rowTitle].map(item => <TableItem>{replace(item)}</TableItem>)}
          </TableRow>
        return appear ?
          <Appear key={rowTitle}>
            {contents}
          </Appear> : contents
      })}
    </tbody>
  </Table>
)

const titleSlide = ({ka, jared}) => (
  <Slide bgColor="primary">
    <Heading size={2} lineHeight={1} textColor="black">
      Paradigms for
    </Heading>
    <Heading size={2} lineHeight={1} textColor="black" margin="0 0 30px">
      Dealing with Asynchrony
    </Heading>
    <Text bold size={4} textFont="primary" textColor="white">
      Observables, Promises,
    </Text>
    <Text bold size={4} textFont="primary" textColor="white" margin="0 0 20px">
      core.async, and callbacks!
    </Text>
    <Link href="https://jaredforsyth.com/asynchrony">
      <Text textColor="tertiary" style={{marginBottom: 30}}>
        jaredforsyth.com/asynchrony
      </Text>
    </Link>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Text bold margin="0 0 0px" style={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'center',
    }}>
      Jared Forsyth
      <Image src={jared} height={75} style={{
        borderRadius: 50,
        marginLeft: 20,
      }}/>
    </Text>
    </div>
    <Image src={ka} height={65}/>
  </Slide>
)

export default ({ka, jared, chart}) => [
  titleSlide({ka, jared}),

  <Slide>
      <Heading size={2} style={{marginBottom: 30}}>Callbacks</Heading>
      <Heading size={2} style={{marginBottom: 30}}>Promises / async+await</Heading>
      <Heading size={2} style={{marginBottom: 30}}>Observables / Rx</Heading>
      <Heading fit size={2} margin="10px 0">Communicating Sequential Processes</Heading>
  </Slide>,

  <Slide>
    <Title>Why do we care?</Title>
    <Appear>
    <CodePane
      textSize="1.0rem"
      lang="javascript"
      source={`<!-- the_good_old_days.html -->
<script>
document.write('<h1>Hello!</h1>')
var name = prompt("What is your name?")
alert("Hello " + name)
if (confirm("Is this a good app?")) {
  alert("Thank you")
} else {
  var feedback = prompt("What should change?")
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'feedback.php?comment=' + feedback, false)
  xhr.send(null)
  if (xhr.status !== 200) {
    alert("Sorry, couldn't save your feedback")
  }
}
window.close()
</script>
`}
    />
    </Appear>
  </Slide>,

  <Slide >
    <Title>Why do we care?</Title>
    <div>
    <Appear>
    <List>
      <ListItem>Event handlers</ListItem>
      <ListItem>Network requests</ListItem>
    </List>
    </Appear>
    <Appear>
      <List>
        <ListItem>File access</ListItem>
        <ListItem>Networking</ListItem>
        <ListItem>Databases</ListItem>
      </List>
    </Appear>
    <Appear>
      <List>
        <ListItem>Animations</ListItem>
        <ListItem>WebWorkers</ListItem>
        <ListItem>IndexedDb</ListItem>
      </List>
    </Appear>
    </div>
  </Slide>,

  ...require('./contestants').default,

  <Slide style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} notes={tableNotes(featureTable)}>
    <Heading size={3} textFont="primary">
      Feature Comparison
    </Heading>
    {makeTable(featureTable, true)}
  </Slide>,

  <Slide style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} notes={tableNotes(feature2)}>
    <Heading size={3} textFont="primary">
      Feature Comparison, part 2
    </Heading>
    {makeTable(feature2, true)}
  </Slide>,

  <Slide style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} notes={tableNotes(featureTable)}>
    <Heading size={3} textFont="primary">
      How bout converting?
    </Heading>
    <Heading size={5} textFont="primary" textColor="white" margin="30px 0">
      interop from {"{top}"} to {"{left}"}
    </Heading>
    {/*makeTable(interopTable, false)*/}
  </Slide>,

  ...require('./interop').default,

  ...require('./proscons').default,

  <Slide>
    <Image width="1000px" src={chart} />
  </Slide>,

  <Slide >
    <Title fit>Things I wish were different</Title>
    <List>
      <ListItem>Observables: Better introspection</ListItem>
      <ListItem>CSP: Cancellation, private put</ListItem>
      <ListItem>Promises: {"don't eat my errors"}</ListItem>
    </List>
  </Slide>,
]

export const others = () => [
    <Image src={images.kat.replace("/", "")} margin="0px auto 40px" height="293px"/>,
    <Image src={images.kat.replace("/", "")} margin="0px auto 40px" height="293px"/>
]
