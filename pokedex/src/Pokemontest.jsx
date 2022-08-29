/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { COLOR } from "./utils"

const Pokemon = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);





    const generatePokemonJSX = (pokemon) => {
        const { name, id, species, height, weight, types, sprites, base_experience, abilities } = pokemon;
        //console.log(pokemon);
        const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        const { front_default } = sprites;

        return (
            <>
                <div style={{ background: COLOR.LINEAR_GRAD(types[0].type.name) }}>
                    <Typography variant="h1">
                        {`${id}.`} {toFirstCharUppercase(name)}
                        <img src={front_default} />
                    </Typography>
                    <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                    <Typography variant="h3">Pokemon Info</Typography>
                    <Typography>
                        {"Species: "}
                        <Link href={species.url}>{species.name} </Link>
                    </Typography>
                    <Typography>Height: {height} </Typography>
                    <Typography>Weight: {weight} </Typography>
                    <Typography>Base experience: {base_experience} </Typography>
                    <Typography variant="h6"> Abilities:</Typography>
                    {
                        abilities.map((abilityInfo) => {
                            const { ability } = abilityInfo;
                            const { name } = ability;
                            return <Typography key={name}> {`${name} `}</Typography>;
                        })
                    }

                    <Typography variant="h6"> Types:</Typography>
                    {
                        types.map((typeInfo) => {
                            const { type } = typeInfo;
                            const { name } = type;
                            return <Typography key={name}> {`${name} `}</Typography>;
                        })
                    }
                </div>
            </>
        );
    };


    return (
        <>
            {pokemon !== undefined && pokemon.id > 1 && pokemon.id < 807 && (
                <Button variant="contained" onClick={() => history.push(`/${pokemon.id - 1}`)}>
                    Previous
                </Button>
            )}
            {pokemon !== undefined && pokemon.id > 1 && pokemon.id < 807 && (
                <Button variant="contained" onClick={() => history.push(`/${pokemon.id + 1}`)}>
                    Next
                </Button>
            )}
            {pokemon !== undefined && pokemon.id === 1 && (
                <Button variant="contained" onClick={() => history.push(`/${pokemon.id + 1}`)}>
                    Next
                </Button>
            )}
            {pokemon !== undefined && pokemon.id === 807 && (
                <Button variant="contained" onClick={() => history.push(`/${pokemon.id - 1}`)}>
                    Previous
                </Button>
            )}
            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    back to pokedex
                </Button>
            )}
            {pokemon === undefined && <CircularProgress />}

            {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}

            {pokemon === false && <Typography> Pokemon not found</Typography>}

        </>
    );
};

export default Pokemon;
