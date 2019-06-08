var fetch = require('node-fetch');

//qo is Query Object
module.exports = function buildQuery(user_query) {
  console.log("BUILDING QUERY")

  qo = {
    "name": user_query.name || "", //The card name. For split, double-faced and flip cards, just the name of one side of the card. Basically each ‘sub-card’ has its own record.
    "layout": user_query.layout || "", //The card layout. Possible values: normal, split, flip, double-faced, token, plane, scheme, phenomenon, leveler, vanguard, aftermath
    "cmc": user_query.cmc || "", //Converted mana cost. Always a number
    "colors": user_query.colors || "", //The card colors. Usually this is derived from the casting cost, but some cards are special (like the back of dual sided cards and Ghostfire).
    "colorIdentity": user_query.colorIdentity || "", //The card colors by color code. [“Red”, “Blue”] becomes [“R”, “U”]
    "type": user_query.type || "", //The card type. This is the type you would see on the card if printed today. Note: The dash is a UTF8 ‘long dash’ as per the MTG rules
    "supertypes": user_query.supertypes || "", //The supertypes of the card. These appear to the far left of the card type. Example values: Basic, Legendary, Snow, World, Ongoing
    "types": user_query.types || "", //The types of the card. These appear to the left of the dash in a card type. Example values: Instant, Sorcery, Artifact, Creature, Enchantment, Land, Planeswalker
    "subtypes": user_query.subtypes || "", //The subtypes of the card. These appear to the right of the dash in a card type. Usually each word is its own subtype. Example values: Trap, Arcane, Equipment, Aura, Human, Rat, Squirrel, etc.
    "rarity": user_query.rarity || "", //The rarity of the card. Examples: Common, Uncommon, Rare, Mythic Rare, Special, Basic Land
    "set": user_query.set || "",
    "setName": user_query.setName || "", //The set the card belongs to.
    "text": user_query.text || "",
    "flavor": user_query.flavor || "",
    "artist": user_query.artist || "", //The artist of the card. This may not match what is on the card as MTGJSON corrects many card misprints.
    "number": user_query.number || "",
    "power": user_query.power || "",
    "toughness": user_query.toughness || "",
    "loyalty": user_query.loyalty || "",
    "contains": user_query.contains || "",
    "page": user_query.page || "",
    "pageSize": user_query.pageSize || ""
  }

  const baseURL = `https://api.magicthegathering.io/v1/cards/?name=${qo.name}&layout=${qo.layout}&cmc=${qo.cmc}&colors=${qo.colors}&colorIdentity=${qo.colorIdentity}&type=${qo.type}&supertypes=${qo.supertypes}&types=${qo.subtypes}&rarity=${qo.rarity}&set=${qo.set}&setName=${qo.setName}&text=${qo.text}&flavor=${qo.flavor}&artist=${qo.artist}&number=${qo.number}&power=${qo.power}&toughness=${qo.toughness}&loyalty=${qo.loyalty}&container=${qo.contains}&page=${qo.page}&pageSize=${qo.pageSize}`
  console.log(baseURL)
  return fetch(baseURL)
  .then(data=>{return data.json()})
  .then(result=>{return result.cards})
  .catch(error=>console.log(error))
}
