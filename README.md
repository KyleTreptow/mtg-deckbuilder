## Welcome to mt MTG Deckbuilder App

We're going to be making use of https://magicthegathering.io/ for all of our data.

Basic idea is to be able to search for specific cards and add them to 'decks' and/or 'sidebards'

### Stack

* Node / Express backend
  https://expressjs.com/

* Vue frontend
  https://vuejs.org/

### Notes

* I'm grabbing the data via the fetch api at the moment, may want to trade out for axios

* the MTG io throttles use, we get 5k calls in an hour and we can only pull 100 items at any one time - we may want to pull all the data into our own local database then set up a cron to update the data daily or so
