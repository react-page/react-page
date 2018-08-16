import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ErrorIcon from '@material-ui/icons/Error';

const NO_FILE_ERROR_CODE = 1
const BAD_EXTENSION_ERROR_CODE = 2
const TOO_BIG_ERROR_CODE = 3
const UPLOADING_ERROR_CODE = 4

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      hasError: false
    }
  }

  static defaultProps = {
    buttonText: 'Upload image',
    icon: <CloudUploadIcon style={{ marginLeft: '8px' }} />,
    allowedExtensions: ['jpg', 'jpeg', 'png'],
    maxFileSize: 5242880
  }

  hasExtension = (fileName) => {
    const pattern = '(' + this.props.allowedExtensions.map(a => a.toLowerCase()).join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName.toLowerCase());
  }

  handleError = (errorCode) => {
    let errorText = 'Unknown error'
    switch (errorCode) {
      case NO_FILE_ERROR_CODE:
        errorText = 'No file selected'
        break
      case BAD_EXTENSION_ERROR_CODE:
        errorText = 'Bad file type'
        break
      case TOO_BIG_ERROR_CODE:
        errorText = 'Too big'
        break
      case UPLOADING_ERROR_CODE:
        errorText = 'Error while uploading'
        break
    }
    // Need to flick "isUploading" because otherwise the handler doesn't fire properly
    this.setState({ hasError: true, errorText, isUploading: true }, () => this.setState({ isUploading: false }))
    setTimeout(() => this.setState({ hasError: false, errorText: '' }), 5000)
  }

  handleFileSelected = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      this.handleError(NO_FILE_ERROR_CODE)
      return
    }
    const file = e.target.files[0];
    if (!this.hasExtension(file.name)) {
      this.handleError(BAD_EXTENSION_ERROR_CODE)
      return
    }
    if (file.size > this.props.maxFileSize) {
      this.handleError(TOO_BIG_ERROR_CODE)
      return
    }
    if (this.props.imageLoaded) {
      this.readFile(file).then(data => this.props.imageLoaded(data))
    }
    if (this.props.imageUpload) {
      this.setState({ isUploading: true })
      this.props.imageUpload(file, this.handleReportProgress).then(resp => {
        this.setState({ progress: undefined, isUploading: false })
        this.props.imageUploaded && this.props.imageUploaded(resp)
      }).catch(error => {
        this.setState({ isUploading: false })
        this.props.imageUploadError && this.props.imageUploadError(error)
      })
    }
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({ file, dataURL });
      };

      reader.readAsDataURL(file);
    });
  }

  handleFileUploadClick = (e) => this.fileInput.click()

  handleReportProgress = (progress: number) => this.setState({ progress })

  renderChildren = () => {
    if (this.state.isUploading) {
      return <CircularProgress value={this.state.progress} size={19} />
    }
    if (this.state.hasError) {
      return <React.Fragment>{this.state.errorText}<ErrorIcon size={19} style={{ marginLeft: '8px' }} /></React.Fragment>
    }
    return <React.Fragment>{this.props.buttonText}{this.props.icon}</React.Fragment>
  }

  render() {
    return (
      <React.Fragment>
        <Button
          disabled={this.state.isUploading}
          variant="contained"
          color={this.state.hasError ? 'secondary' : 'primary'}
          onClick={this.handleFileUploadClick}
          style={{
            ...this.props.style,
          }}
        >
          {this.renderChildren()}
        </Button>
        {!this.state.isUploading && <input
          style={{ display: 'none' }}
          ref={fileInput => this.fileInput = fileInput}
          type="file"
          onChange={this.handleFileSelected}
        />}
      </React.Fragment>
    );
  }
}

export default ImageUpload