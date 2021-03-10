import { Box, Button, DialogTitle, Dialog, 
    DialogContent, DialogContentText, 
    TextField, DialogActions } from '@material-ui/core'
import React, { Component } from 'react'
import './textform.css'

export class TextForm extends Component {
    state = { 
      showPopup: false, 
      title: "",
      content: ""
    }

    closePopup = () => {
      this.setState({
        showPopup: false, 
        title: "",
        content: ""
      })
    }

    openPopup = () => {
      this.setState({
        showPopup: true
      })
    }

    handleTextMod = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "formTitleIn") {
            this.setState({
                title: value
            })
        } else {
            this.setState({
                content: value
            })
        }
    }

    render() {
        const {buttonName, buttonVar, buttonColor, formTitle, siconType, 
                eiconType, formInstructions, formLabel, formRows, 
                sendFormName, hasTitle, titleInstr, onSubmit} = this.props;

        const addTitle = () => {
            if (hasTitle === true) {
                return (
                    <Box id='formEditTitle'>
                      <DialogContentText>
                        {titleInstr}
                      </DialogContentText>
                      <TextField
                        name="formTitleIn"
                        value={this.state.title}
                        id="outlined-basic" 
                        label="" 
                        variant="outlined"
                        fullWidth
                        onChange={ this.handleTextMod }
                      />
                    </Box>
                )
            } 
        }

        const handleSubmit = () => {
            if (hasTitle && this.state.title !== "" && this.state.content !== "") {
                onSubmit("sample_username", this.state.title, this.state.content);
            } else if (buttonName === "Reply" && this.state.content !== "") {
                onSubmit("sample_username", this.state.content);
            }
            this.closePopup();
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
                    value={this.state.content}
                    label={formLabel}
                    id="outlined-multiline-static"
                    multiline
                    rows={formRows}
                    variant="outlined"
                    fullWidth
                    onChange={ this.handleTextMod }
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={this.closePopup}>
                  Cancel
                </Button>
                <Button variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
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