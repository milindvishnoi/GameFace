import { Box, Button, DialogTitle, Dialog, 
    DialogContent, DialogContentText, 
    TextField, DialogActions } from '@material-ui/core'
import React, { Component } from 'react'
import './textform.css'

export class TextForm extends Component {
    state = { 
      showPopup: false, 
    }

    closePopup = () => {
      this.setState({
        showPopup: false
      })
    }

    openPopup = () => {
      this.setState({
        showPopup: true
      })
    }

    render() {
        const {buttonName, buttonVar, buttonColor, formTitle, siconType, 
                eiconType, formInstructions, formLabel, formRows, 
                sendFormName, hasTitle} = this.props;

        const addTitle = () => {
            if (hasTitle === true) {
                return (
                    <Box id='formEditTitle'>
                      <DialogContentText>
                        Make an interesting Title:
                      </DialogContentText>
                      <TextField
                        id="outlined-basic" 
                        label="" 
                        variant="outlined"
                        fullWidth
                      />
                    </Box>
                )
            } 
        }
        // Created from Dialag Form template found on material ui documentation website
      return (
        <div>
            <Button variant={buttonVar} 
                    color={buttonColor}
                    onClick={this.openPopup} 
                    startIcon={siconType} 
                    endIcon={eiconType}>
              {buttonName}
            </Button>
            <Dialog maxWidth='md' 
                    fullWidth={true} 
                    open={this.state.showPopup}>
              <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
              <DialogContent>
                {addTitle()}
                <Box id='formContent'>
                  <DialogContentText>
                    {formInstructions}
                  </DialogContentText>
                  <TextField
                    label={formLabel}
                    id="outlined-multiline-static"
                    multiline
                    rows={formRows}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.closePopup}>
                  Cancel
                </Button>
                <Button variant="contained" 
                        color="primary" 
                        onClick={this.closePopup}
                        startIcon={siconType} 
                        endIcon={eiconType}>
                  {sendFormName}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
      )}
}

export default TextForm