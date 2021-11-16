const parseDetails = (data) => {
  if (!data) return {};

  const { name, moves, sprites, types, id } = data;
  const movesParsed = moves ? moves.map(({ move }) => move.name) : [];
  const typesParsed = types ? types.map(({ type }) => type.name) : [];

  return {
    id,
    name: name,
    moves: movesParsed,
    image:
      sprites?.front_default ||
      "https://s2.coinmarketcap.com/static/img/coins/200x200/8303.png",
    types: typesParsed,
    captured: false,
  };
};

export default parseDetails;
