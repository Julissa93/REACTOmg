import React, {Component} from 'react'
import {sendWhiteboardData} from '../store/whiteBoard'
import {connect} from 'react-redux'
import '../../public/style.css'

import WhiteBoard, {
  getWhiteBoardData,
  loadWhiteBoardData,
  addWhiteBoardObject,
  modifyWhiteBoardObjects,
  removeWhiteBoardObjects,
  clearWhiteBoardContext,
  createWhiteBoardSelection,
  updateWhiteBoardSelection,
  clearWhiteBoardSelection
} from 'fabric-whiteboard'

class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'select',
      width: '750px',
      height: '600px',
      brushColor: '#f44336',
      brushThickness: 2,
      whiteboardData: '{"version":"3.6.3","objects":[]}' //Empty canvas
    }

    this.refLeft = undefined
    this.refRight = undefined

    this.handleOnModeClick = this.handleOnModeClick.bind(this)
    this.handleOnBrushColorChange = this.handleOnBrushColorChange.bind(this)
    this.handleOnBrushThicknessChange = this.handleOnBrushThicknessChange.bind(
      this
    )
    this.handleOnObjectAdded = this.handleOnObjectAdded.bind(this)
    this.handleOnObjectsModified = this.handleOnObjectsModified.bind(this)
    this.handleOnObjectsRemoved = this.handleOnObjectsRemoved.bind(this)
    this.handleOnSelectionCreated = this.handleOnSelectionCreated.bind(this)
    this.handleOnSelectionUpdated = this.handleOnSelectionUpdated.bind(this)
    this.handleOnSelectionCleared = this.handleOnSelectionCleared.bind(this)
    this.handleWhiteboardChange = this.handleWhiteboardChange.bind(this)
    this.handleWhiteboardSocketUpdate = this.handleWhiteboardSocketUpdate.bind(
      this
    )
    this.handleClearButton = this.handleClearButton.bind(this)
  }

  componentDidUpdate() {
    if (this.props.stateWBData !== this.state.whiteboardData) {
      this.setState({whiteboardData: this.props.stateWBData})
      this.handleWhiteboardSocketUpdate(this.props.stateWBData)
    }
  }

  handleWhiteboardChange() {
    const jsonData = getWhiteBoardData(this.refLeft)
    const domTextarea = document.getElementById('toolbar-textarea')
    if (domTextarea) {
      domTextarea.value = JSON.stringify(jsonData)
    }
    this.props.sendWhiteboardData(JSON.stringify(jsonData), this.props.room)
    this.setState({whiteboardData: JSON.stringify(jsonData)})
  }

  handleWhiteboardSocketUpdate(data) {
    if (data && data !== '') {
      loadWhiteBoardData(this.refRight, data)
      loadWhiteBoardData(this.refLeft, data)
    }
  }

  handleOnModeClick(mode) {
    this.setState({
      mode: mode
    })
  }

  handleOnBrushColorChange(color) {
    this.setState({
      brushColor: color.hex
    })
  }

  handleOnBrushThicknessChange(thickness) {
    this.setState({
      brushThickness: thickness
    })
  }

  handleOnObjectAdded(object) {
    this.handleWhiteboardChange()
    addWhiteBoardObject(this.refRight, object)
  }

  handleOnObjectsModified(object) {
    this.handleWhiteboardChange()
    modifyWhiteBoardObjects(this.refRight, object)
  }

  handleOnObjectsRemoved(objects) {
    this.handleWhiteboardChange()
    removeWhiteBoardObjects(this.refRight, objects)
  }

  handleOnSelectionCreated(selection) {
    this.handleWhiteboardChange()
    createWhiteBoardSelection(this.refRight, selection)
  }

  handleOnSelectionUpdated(selection) {
    this.handleWhiteboardChange()
    updateWhiteBoardSelection(this.refRight, selection)
  }

  handleOnSelectionCleared(selection) {
    this.handleWhiteboardChange()
    clearWhiteBoardSelection(this.refRight, selection)
  }

  handleClearButton() {
    this.setState({whiteboardData: '{"version":"3.6.3","objects":[]}'})
    clearWhiteBoardContext(this.refLeft)
    clearWhiteBoardContext(this.refRight)
    this.props.sendWhiteboardData(
      '{"version":"3.6.3","objects":[]}',
      this.props.room
    )
    const domTextarea = document.getElementById('toolbar-textarea')
    if (domTextarea) {
      domTextarea.value = ''
    }
  }
  render() {
    const {mode, width, height, brushColor, brushThickness} = this.state
    return (
      <div className="whiteboard-component">
        <div id="whiteboard">
          <WhiteBoard
            className="whiteboard"
            ref={ref => {
              this.refLeft = ref
            }}
            width={width}
            height={height}
            showToolbar={true}
            enableToolbar={true}
            showBoard={true}
            mode={mode}
            onModeClick={this.handleOnModeClick}
            brushColor={brushColor}
            brushColors={[
              '#f44336',
              '#e91e63',
              '#9c27b0',
              '#673ab7',
              '#3f51b5',
              '#2196f3'
            ]}
            brushThickness={brushThickness}
            onBrushColorChange={this.handleOnBrushColorChange}
            onBrushThicknessChange={this.handleOnBrushThicknessChange}
            onObjectAdded={this.handleOnObjectAdded}
            onObjectsModified={this.handleOnObjectsModified}
            onObjectsRemoved={this.handleOnObjectsRemoved}
            onSelectionCreated={this.handleOnSelectionCreated}
            onSelectionUpdated={this.handleOnSelectionUpdated}
            onSelectionCleared={this.handleOnSelectionCleared}
          />
        </div>

        <div className="toolbar" id="toolbar">
          <button className="toolbar-button" onClick={this.handleClearButton}>
            Clear
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stateWBData: state.whiteBoard
})

const mapDispatchToProps = dispatch => ({
  sendWhiteboardData: (newWhiteboardData, room) =>
    dispatch(sendWhiteboardData(newWhiteboardData, room))
})

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard)
