import {
  getUserListStarted, getUserListSuccess, getUserListFailure
} from "../actions/userActions";
import axios from 'axios';
//import React, { Redirect } from "react";

// get user list
// export const getUserList = (page = 1) => async dispatch => {
//   dispatch(getUserListStarted());
//   try {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/13`);
//     const data = await res.json();
//     console.log(data);
//     dispatch(getUserListSuccess(data));
//   } catch (err) {
//     dispatch(getUserListFailure(err.message));
//   }
// }
//let res = undefined;

export const getPokemonList = (url) => dispatch => {
  dispatch(getUserListStarted());
  axios
    .get(`${url}`)
    .then(function (response) {
      const { data } = response;
      //  console.log("pokedata",data);
      //res = data;
      // console.log(res);

      dispatch(getUserListSuccess(data));
      //setPokemon(data);
    })
    .catch(function (error) {
      //setPokemon(false);

      dispatch(getUserListFailure(error.message));
    });


}