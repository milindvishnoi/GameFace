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
// Importing actions/required methods
import { getAllGames, deleteGame } from "../actions/games";
import { IconButton } from '@material-ui/core';

export class AdminPage extends Component {
  state = {
    gameList: [],
    deleteId: ""
  }

  componentDidMount() {
    getAllGames(this)
  }

  editGame() {

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
        <Box className="my-8">
          <Typography variant='h1' color='primary'>Edit All Games</Typography>
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
                    <IconButton onClick={() => this.editGame}>
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
      </Box>
    )}
}

export default AdminPage
