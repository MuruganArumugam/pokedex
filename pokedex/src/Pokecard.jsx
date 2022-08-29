const { name, id, species, height, weight, types, sprites, base_experience, abilities } = pokemon;
//console.log(pokemon);
const fullImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const { front_default } = sprites;

<div style={{ background: COLOR.LINEAR_GRAD(types[0].type.name) }}>
    <Typography variant="h1">
        {`${id}.`} {toFirstCharUppercase(name)}
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