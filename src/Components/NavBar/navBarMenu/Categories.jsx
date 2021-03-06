import React, {useState} from 'react';
import '../../../Styles/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function Categories({data}) {

  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
      setCategory(event.target.innerText);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };

    const list = [];

    for (const x of data) {
      list.push(<NavLink key={x.id} to={`/categories/${x.name}`} style={{textDecoration:'none', color:'inherit'}} >
      <MenuItem  value={x.name}>{x.name}</MenuItem> 
      </NavLink>)}

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label" >Categories</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          onChange={handleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>s
          <NavLink to={`/`} style={{textDecoration:'none', color:'inherit'}}><MenuItem value=""><em>ALL</em></MenuItem></NavLink>
          {list}
        </Select>
      </FormControl>
    </div>
  );
}