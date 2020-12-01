import React from 'react'
import PropTypes from 'prop-types'

const ENTER_KEY_CODE = 13
const DEFAULT_LABEL_PLACEHOLDER = "Click To Edit"

export default class EditableLabel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || "",
    }

    this.icon = this.props.icon

    this._handleFocus = this._handleFocus.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text || "",
      isEditing: this.state.isEditing || nextProps.isEditing || false
    })
  }

  _isTextValueValid() {
    return (typeof this.state.text != "undefined" && this.state.text.trim().length > 0)
  }

  _handleFocus() {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === 'function') {
        this.props.onFocusOut(this.state.text)
      }
    }
    else {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.text)
      }
    }

    if (this._isTextValueValid()) {
      this.setState({
        isEditing: !this.state.isEditing,
      })
    } else {
      if (this.state.isEditing) {
        this.setState({
          isEditing: this.props.emptyEdit || false
        })
      } else {
        this.setState({
          isEditing: true
        })
      }
    }
  }

  _handleChange() {
    this.setState({
      text: this.textInput.value,
    })
  }

  _handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this._handleEnterKey()
    }
  }

  _handleEnterKey() {
    this._handleFocus()
  }

  render() {
    if (this.state.isEditing) {
      return <div>
        <input type="text"
          className={this.props.inputClassName}
          ref={(input) => { this.textInput = input }}
          value={this.state.text}
          onChange={this._handleChange}
          onBlur={this._handleFocus}
          onKeyDown={this._handleKeyDown}
          style={{
            width: this.props.inputWidth,
            height: this.props.inputHeight,
            fontSize: this.props.inputFontSize,
            fontWeight: this.props.inputFontWeight,
            borderWidth: this.props.inputBorderWidth,

          }}
          maxLength={this.props.inputMaxLength}
          placeholder={this.props.inputPlaceHolder}
          tabIndex={this.props.inputTabIndex}
          autoFocus />
      </div>
    }

    const labelText = this._isTextValueValid() ? this.state.text : (this.props.labelPlaceHolder || DEFAULT_LABEL_PLACEHOLDER)
    const iconLabel = this.icon
    return <div onClick={this._handleFocus} style={{ cursor: 'pointer' }}>
      <label className={this.props.labelClassName}  
        style={{
          fontSize: this.props.labelFontSize,
          fontWeight: this.props.labelFontWeight,
        }}>
        {labelText}
      </label>
      {iconLabel}
    </div>
  }
}

EditableLabel.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.any,
  isEditing: PropTypes.bool,
  emptyEdit: PropTypes.bool,
  labelPlaceHolder: PropTypes.string,

  labelClassName: PropTypes.string,
  labelFontSize: PropTypes.string,
  labelFontWeight: PropTypes.string,

  inputMaxLength: PropTypes.number,
  inputPlaceHolder: PropTypes.string,
  inputTabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  inputFontSize: PropTypes.string,
  inputFontWeight: PropTypes.string,
  inputClassName: PropTypes.string,
  inputBorderWidth: PropTypes.string,

  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func
}
