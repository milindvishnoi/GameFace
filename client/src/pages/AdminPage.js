import React, { Component } from 'react'
import { user, admin } from '../data'
import './PersonalPage.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { Dialog, DialogContent, DialogContentText, Button, DialogTitle, DialogActions, TextField } from '@material-ui/core';
// Importing actions/required methods
import { getAllGames, deleteGame, editGameInfo } from "../actions/games";
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'

export class AdminPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameList: [],
      deleteId: "",
      open: false,
      game: null,
      title: null,
      description: null
    }
  }
  

  handleChange = (e) => {
    e.preventDefault()
    const id = e.target.id
    const value = e.target.value

    console.log(id, value, this)

    this.setState({
      [id]: value
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleSubmit = () => {
    editGameInfo(this)
  }

  componentDidMount() {
    getAllGames(this)
  }

  editGame(game) {
    this.setState({
      title: game.title,
      description: game.description,
      game: game,
      open: true
    })

    console.log(this.state.open)
  }

  deleteGameAPICall(id) {
    console.log(id)
    this.setState(
      { deleteId: id },
      () => { deleteGame(this) }
    )
  }

  render() {
    const { logout, gameAdminLoggedIn, siteAdminLoggedIn } = this.props;
    const isAdmin = gameAdminLoggedIn || siteAdminLoggedIn;

    const profile = isAdmin ? admin : user

    return (
      <Box>
        <Box className="my8">
          <Typography variant='h1' color='primary'>Edit All Games</Typography>
        </Box>

        <Box align='right'>
          <Link to="/create-new-game">
            <Button color='primary'>
              Create New Game
            </Button>
          </Link>
        </Box>

        <Paper>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.gameList.map((game) => (
                <TableRow key={game._id}>
                  <TableCell component="th" scope="row">
                    {game.title}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => this.editGame(game)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                  <IconButton>
                    <DeleteIcon onClick={() => this.deleteGameAPICall(game._id)} />
                  </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can edit the game title and it's description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleChange}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Change Game Info
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    )}
}

export default AdminPage
