import React from 'react'
import Prism, {highlight, languages} from 'prismjs'
import SimpleEditor from 'react-simple-code-editor'

const Editor = props => {
  return (
    <form onSubmit={props.handleSubmit} className="editor-form-component">
      <SimpleEditor
        className="editor"
        value={props.code}
        defaultValue={props.code}
        onValueChange={code => props.handleChange(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        preClassName="language-js code"
        language="javascript"
      />
      <button className="btn submit-code btn-run" type="submit">
        Run
      </button>
    </form>
  )
}

export default Editor
