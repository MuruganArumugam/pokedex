import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPokemonList } from '../asyncActions/userAsyncActions';
// import { useSelector } from 'react-redux';


// const getPokemonList = (url) => dispatch => {
//     dispatch(getUserListStarted());
//     axios
//         .get(`${url}`)
//         .then(function (response) {
//             const { data } = response;
//             console.log(data);
//             //res = data;
//             // console.log(res);

//             dispatch(getUserListSuccess(data));
//             //setPokemon(data);
//         })
//         .catch(function (error) {
//             //setPokemon(false);

//             dispatch(getUserListFailure(error.message));
//         });


// }

// function getPokemonList(url) {
//     return function (dispatch) {
//         dispatch(getUserListStarted());
//         axios
//             .get(`${url}`)
//             .then(function (response) {
//                 const { data } = response;
//                 console.log(data);
//                 //res = data;
//                 // console.log(res);

//                 dispatch(getUserListSuccess(data));
//                 //setPokemon(data);
//             })
//             .catch(function (error) {
//                 //setPokemon(false);

//                 dispatch(getUserListFailure(error.message));
//             });


//     }
// }

// function getPokemonList(url) {
//     return function (dispatch) {
//         dispatch(getUserListStarted());
//         axios
//             .get(`${url}`)
//             .then(function (response) {
//                 const { data } = response;
//                 console.log(data);
//                 //res = data;
//                 // console.log(res);

//                 dispatch(getUserListSuccess(data));
//                 //setPokemon(data);
//             })
//             .catch(function (error) {
//                 //setPokemon(false);

//                 dispatch(getUserListFailure(error.message));
//             });


//     }
// }


class homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userObj: { props }
        }
    }

    componentDidMount() {
        this.props.getPokemonList('https://pokeapi.co/api/v2/pokemon/16');
    }
    render() {
        console.log("clg this props", this.props.userObj);
        const { data } = this.props.userObj;
        return (
            <div>homepage {data.id}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(homepage);