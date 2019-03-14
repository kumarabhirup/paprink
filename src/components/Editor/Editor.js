import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import Head from 'next/head'

export default class PaprinkEditor extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      editor: null
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  componentDidMount() {
    this.setState({ editor: Editor })
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state
    const ClientEditor = this.state.editor

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <>
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          { this.state.editor ?
            <ClientEditor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story... ✍️"
              ref="editor"
              spellCheck={true}
            /> 
          : null }
        </div>
      </div>

      </>
    )
  }

}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "center":
      return "RichEditor-center";
    case "left":
      return "RichEditor-left";
    case "right":
      return "RichEditor-right";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: (<i class="fa fa-header" aria-hidden="true">1</i>), style: "header-one" },
  { label: (<i class="fa fa-header" aria-hidden="true">2</i>), style: "header-two" },
  { label: (<i class="fa fa-header" aria-hidden="true">3</i>), style: "header-three" },
  { label: (<i class="fa fa-header" aria-hidden="true">4</i>), style: "header-four" },
  { label: (<i class="fa fa-header" aria-hidden="true">5</i>), style: "header-five" },
  { label: (<i class="fa fa-align-left" aria-hidden="true"></i>), style: "left" },
  { label: (<i class="fa fa-align-center" aria-hidden="true"></i>), style: "center" },
  { label: (<i class="fa fa-align-right" aria-hidden="true"></i>), style: "right" },
  { label: (<i class="fa fa-quote-left" aria-hidden="true"></i>), style: "blockquote" },
  { label: (<i class="fa fa-code" aria-hidden="true"></i>), style: "code-block" },
  { label: (<i class="fa fa-list-ol" aria-hidden="true"></i>), style: "ordered-list-item" },
  // { label: "UL", style: "unordered-list-item" },
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: (<i class="fa fa-bold" aria-hidden="true"></i>), style: "BOLD" },
  { label: (<i class="fa fa-italic" aria-hidden="true"></i>), style: "ITALIC" },
  { label: (<i class="fa fa-underline" aria-hidden="true"></i>), style: "UNDERLINE" },
  { label: (<i class="fa fa-i-cursor" aria-hidden="true"></i>), style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}