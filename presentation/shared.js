
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


export const Title = ({children, fit}) => (
  <Heading fit={fit} size={2} textFont="primary" margin="0 0 30px">
    {children}
  </Heading>
)

export const SubTitle = ({children}) => (
  <Heading size={4} textFont="primary" textColor="white" margin="0 0 30px">
    {children}
  </Heading>
)

export const BigTitle = ({children}) => (
  <Heading size={1} fit textFont="primary">
    {children}
  </Heading>
)
