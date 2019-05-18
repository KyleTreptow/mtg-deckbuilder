/*
example object
qo = {
  "name": name || "", //The card name. For split, double-faced and flip cards, just the name of one side of the card. Basically each ‘sub-card’ has its own record.
  "layout": layout || "", //The card layout. Possible values: normal, split, flip, double-faced, token, plane, scheme, phenomenon, leveler, vanguard, aftermath
  "cmc": cmc || "", //Converted mana cost. Always a number
  "colors": colors || "", //The card colors. Usually this is derived from the casting cost, but some cards are special (like the back of dual sided cards and Ghostfire).
  "colorIdentity": colorIdentity || "", //The card colors by color code. [“Red”, “Blue”] becomes [“R”, “U”]
  "type": type || "", //The card type. This is the type you would see on the card if printed today. Note: The dash is a UTF8 ‘long dash’ as per the MTG rules
  "supertypes": supertypes || "", //The supertypes of the card. These appear to the far left of the card type. Example values: Basic, Legendary, Snow, World, Ongoing
  "types": types || "", //The types of the card. These appear to the left of the dash in a card type. Example values: Instant, Sorcery, Artifact, Creature, Enchantment, Land, Planeswalker
  "subtypes": subtypes || "", //The subtypes of the card. These appear to the right of the dash in a card type. Usually each word is its own subtype. Example values: Trap, Arcane, Equipment, Aura, Human, Rat, Squirrel, etc.
  "rarity": rarity || "", //The rarity of the card. Examples: Common, Uncommon, Rare, Mythic Rare, Special, Basic Land
  "set": set || "",
  "setName": setName || "", //The set the card belongs to.
  "text": text || "",
  "flavor": flavor || "",
  "artist": artist || "", //The artist of the card. This may not match what is on the card as MTGJSON corrects many card misprints.
  "number": number || "",
  "power": power || "",
  "toughness": toughness || "",
  "loyalty": loyalty || "",
  "contains": contains || "",
}

*/


//qo is Query Object
module.exports = function buildQuery(qo) {
  const baseURL = `https://api.magicthegathering.io/v1/cards/
  ?name=${qo.name}
  &layout=${qo.layout}
  &cmc=${qo.cmc}
  &colors=${qo.colors}
  &colorIdentity=${qo.colorIdentity}
  &type=${qo.type}
  &supertypes=${qo.supertypes}
  &types=${qo.subtypes}
  &rarity=${qo.rarity}
  &set=${qo.set}
  &setName=${qo.setName}
  &text=${qo.text}
  &flavor=${qo.flavor}
  &artist=${qo.artist}
  &number=${qo.number}
  &power=${qo.power}
  &toughness=${qo.toughness}
  &loyalty=${qo.loyalty}
  &container=${qo.contains}
  `
  return baseURL
}
