import React from 'react'
import {connect} from 'react-redux'
import ReactModal from 'react-modal'

const CodeOutput = props => {
  ReactModal.setAppElement('#app')

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      className="output"
      overlayClassName="overlay"
    >
      <button className="exit-modal" onClick={props.toggleModal}>
        X
      </button>

      <h3 className="modal-title">Code Output</h3>
      <div className="result">
        {' > '}
        {props.result}
      </div>
    </ReactModal>
  )
}

const mapState = state => ({
  output: state.codeEditor.output,
  loading: state.codeEditor.loading
})

export default connect(mapState)(CodeOutput)
