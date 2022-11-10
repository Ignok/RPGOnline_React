import React, {Component} from 'react';

import { getUsersAbout } from '../../Api_RPGOnline';

export class AboutMe extends Component{
    constructor(props){
        super(props);
        this.state={
            uId: props.uId
        }
    }

    refreshPage(){
        getUsersAbout(1)
        .then(response=>response.json())
        .then(data=>{
            this.setState({user:data});
            console.log(data);
        });
    }

    componentDidMount(){
        this.refreshPage();
    }

    render(){
        const {user}=this.state;
        console.log(user);
        return(
                <div>
                    {/* <Table className='mt-4' striped bordered hover size='sm'> */}
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>E-mail</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>AboutMe</th>
                                <th>Attitude</th>
                                <th>Creation date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user=>
                                <tr>
                                    <td>{user.uId}</td>
                                    <td>{user.email}</td>
                                    <td>{user.country}</td>
                                    <td>{user.city}</td>
                                    <td>{user.aboutMe}</td>
                                    <td>{user.attitude}</td>
                                    <td>{user.creationDate}</td>
                                </tr>
                                }
                        </tbody>
                    </table>        
                    {/* </Table> */}
                </div>
        )
    }
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

// const Demo = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
// }));

// export default function InteractiveList() {
//   const [dense, setDense] = React.useState(false);
//   const [secondary, setSecondary] = React.useState(false);

//   return (
//     <Box sx={{ flexGrow: 1, maxWidth: 752 }}>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
//             Text only
//           </Typography>
//           <Demo>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemText
//                     primary="Single-line item"
//                     secondary={secondary ? 'Secondary text' : null}
//                   />
//                 </ListItem>,
//               )}
//             </List>
//           </Demo>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }