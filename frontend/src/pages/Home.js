import { Box, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TopGames from '../components/TopGames';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const topGames = [
  {
    name: "NBA 2K22",
    imgSrc: "../../public/topGames/nba2k22.jpg"
  }
]

export class Home extends Component {
  render() {
    return (
      <div>
        <Box height="88vh" display="flex" alignItems="center" justifyContent="center">
          <Typography variant='h2'>Website Name</Typography>
        </Box>

        <Typography variant='h3'>Top 10 Games</Typography>
        {topGames.map((row) => (
          <TopGames imgSrc={row.imgSrc}
                    name={row.name}
                    key={row.name} />
        ))}
      </div>
    )
  }
}

export default Home 