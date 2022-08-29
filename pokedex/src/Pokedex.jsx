import React, { useEffect, useState } from "react";
import Popup from './Popup';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import lightbutton from './finalyellow.gif';
import "./popupstyles.css";
//for redux-thunk below


const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",

  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade("#5db9ff", 0.25),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "2em",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "12px",
    height: "35px",
    width: "35px",
  },
  searchInput: {
    width: "200px",
    marginBottom: "10px",
    color: "white",

  },




}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
              }.png`,

          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    //console.log(types);
    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)} >
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "180px", height: "180px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid >
    );
  };

  //for popup
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div style={{ backgroundColor: "#363b81", }}>
        <AppBar position="static" style={{ backgroundColor: "#363b81", }}>
          <Toolbar>
            <div className={classes.searchContainer}>
              <SearchIcon className={classes.searchIcon} />
              &ensp;
              <TextField
                InputProps={{
                  className: classes.searchInput
                }}
                InputLabelProps={{ style: { color: 'white' } }}
                onChange={handleSearchChange}
                label="Pokemon"
                variant="standard"
              />
            </div>
            <div>
              <Typography variant="h3" className={classes.mainHeading} style={{ paddingLeft: "280px", }}>Pokedex</Typography>
            </div>
            <img className="imagebulb" src={lightbutton} height="60px" alt="lighter" style={{ marginLeft: 'auto', }} onClick={togglePopup} />
          </Toolbar>
        </AppBar>
        {isOpen && <Popup
          content={<>
            <Typography variant="h6">Hello there, Pokemon trainer !!! <br />It is a pokedex application that contains pokemon stats. <br />To learn more about a Pokemon, click on the Pokecard.
              <br />
              <br />
              Developed by Murugan Arumugam</Typography>
          </>}
          handleClose={togglePopup}
        />}
      </div>
      {
        pokemonData ? (
          <Grid container spacing={2} className={classes.pokedexContainer}>
            {Object.keys(pokemonData).map(
              (pokemonId) =>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId)
            )}
          </Grid>
        ) : (
          <CircularProgress />
        )
      }
    </>
  );
};

export default Pokedex;
