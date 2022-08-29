import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemonList } from './asyncActions/userAsyncActions';
import { Typography, Grid, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import { COLOR } from "./utils";

import "./Profile.css";

class Pokemon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userObj: { props }
    }
  }

  componentDidMount() {

    const { match, history } = this.props;
    const { params } = match;
    const { pokemonId } = params;
    const page = pokemonId;
    console.log("page number", page);
    this.props.getPokemonList(`https://pokeapi.co/api/v2/pokemon/${page}`);
  }

  render() {
    console.log("clg this props", this.props.userObj);
    const { data } = this.props.userObj;
    const pokemon = data;
    //card begins
    //console.log("pokemondata", pokemon)
    const { name, id, species, height, weight, types, sprites, base_experience, abilities } = pokemon;
    // console.log("pokepage", pokemon);
    const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const front_default = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    //const specipoke = { species };
    //const ability1 = abilities ? abilities[0].ability.name : "";
    //  const len = abilities.length;
    //console.log(len);
    console.log("Abilities", Array.isArray(abilities));
    // const { ability } = abilities;
    const ability3 = abilities ? abilities.length : "";
    console.log("length", ability3);
    const abl = [];
    for (var i = 0; i < ability3; i++) {
      abl.push(abilities[i].ability.name)
    }
    console.log("Ability list", abl)
    const pokecolor = types ? types[0].type.name : "normal";
    const pokename = species ? species.name : "pokemon";

    console.log("specipoke", types);
    return (
      <>
        <br />
        <div style={{ float: "right", marginRight: "30px", marginTop: "520px", }}>
          {pokemon !== undefined && (
            <Grid container justify="center">
              <Button variant='contained' align="center" onClick={() => this.props.history.push("/")}>
                Back to pokedex
              </Button>
            </Grid>
          )}
        </div>

        <div style={{ padding: "0 px" }}>
          {/* <Typography variant='h1'>{name}</Typography>
          <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} alt={name} />
          <Typography variant="h3">  Pokemon Info</Typography>
          <Typography>Species: {name} </Typography>
          <Typography>Height: {height} </Typography>
          <Typography>Weight: {weight} </Typography>
          <Typography>Base experience: {base_experience} </Typography>

          <div>Abilities:

            {abl.map((name) => {
              return <Typography key={name}> {`${name} `}</Typography>;
            })
            }
          </div> */}


          <div className="card" style={{ background: COLOR.LINEAR_GRAD(pokecolor) }}>
            <img src={fullImageUrl} style={{ width: "250px", height: "250px" }} />
            <Typography variant='h3'>{toFirstCharUppercase(pokename)}</Typography>
            <p className="title"><strong>Base experience:</strong> {base_experience}</p>
            <p><strong>Height:</strong> {height}</p>
            <p><strong>Weight:</strong> {weight}</p>
            <p><strong>Abilities:</strong><br />

              {abl.map((name, index) => {
                const abilityname = toFirstCharUppercase(name);
                return <> {`${index + 1}). ${abilityname}`} <br /></>;
              })
              }
            </p>
            <br />
          </div>



          {pokemon === undefined && <CircularProgress />}



          {pokemon === false && <Typography> Pokemon not found</Typography>}

        </div>
      </>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    userObj: state
  }
}

const mapDispatchToProps = {
  getPokemonList
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
