import logo from './logo.svg';
import './App.css';
import React from 'react';

import { marked } from "marked";
import {Markdown} from 'react-marked-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'prism-react-renderer';

let markupText = `# Welcome to my React Markdown Previewer!\n## This is a sub-heading...\n### And here's some other cool stuff:\nHeres some code, \`<div></div>\`, between 2 backticks.\n\`\`\`\n
    // this is multi-line code:
function anotherExample(firstLine, lastLine) {\n\tif (firstLine == '\`\`\`' && lastLine == '\`\`\`'){\nreturn multiLineCode;\n}\n}\n\`\`\`\nYou can also make text **bold**... whoa!
    Or _italic_.
    Or... wait for it... **_both!_**
    And feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\nAnd if you want to get really crazy, even tables:
 

Wild Header      | Crazy Header   | Another Header?
-----------------|-----------------|-----------------
Your content can | be here, and it | can be here....
And here.        | Okay.           | I think we get it. 

- And of course there are lists.<br/>
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
        <br/> 
    1. And there are numbered lists too.
    1. Use just 1s if you want!
    1. And last but not least, let's not forget embedded images:
    
    ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
    `;
    
marked.setOptions({
  gfm:  true,
  breaks: true,
});
    

class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      input : '' // store the user input in text area in app 
    };
    this.changeParentState = this.changeParentState.bind(this)
  }
  changeParentState(inputMessage) {
    this.setState({input:inputMessage}); // set state when changeParentState called
  }
  render()
  { // send state input to the previewer
    return (
      <div className="App">
        <Editor changeParentState = {this.changeParentState}/>
        <Previewer plainText = {this.state.input}/> 
      </div>
    );
  }
  
}


class Editor extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.changeParentState(event.target.value); // pass the input to the parent
  } 
  render() {
      return (
        <div className='editor'>
          <h1 id="title"><FontAwesomeIcon icon="fa-solid fa-code" />  Editor</h1>
          <textarea id="editor" rows='10' cols='100' onChange={this.handleChange}>{markupText}</textarea>
        </div>
    );
  }
}

class Previewer extends React.Component {
  constructor(props)
  {
    super(props)
    this.renderMarkup = this.renderMarkup.bind(this)
  }
  renderMarkup() {
    if(this.props.plainText != '') {
      markupText = this.props.plainText;
    }
    return {
      __html : marked(markupText, {sanitize : true})
    };
  }
  
  render() { // print the state input in previewer as markup

    return (
      <div className='previewer'>
        <h1 id="title"><FontAwesomeIcon icon="fa-solid fa-display" />  Previewer</h1>
        <div
        id="preview"
         dangerouslySetInnerHTML={this.renderMarkup()}
        
     />
    </div>
    );
  }
}

export default App;
