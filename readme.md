# Boxmac API for the BoxMac youtube show by Red Cow Entertainment #

## API by Zoey Cluff, database contents by Frankie Frain ##

The BoxmacDB API powers the boxmacdb.com website. It's powered by node with the MongooseJS package and MongoDB database. This is a quick and dirty API and coded by someone without much of a clue (if I'm honest). It works in my (somewhat) through testing at least as far as I expect it to work. Currently it only supports GET requests, however there's a POST request in the code but it's not wired into anything. (Want to get V1 of the site online as I originally said it'd be done by Jan 1st).


### Endpoints ###


/boxmac/:
(POST)
Inserts a row into the database. Not wired to anything currently and I've never tested it. Eventually I'll add the required fields to this so you know what needs to be there.

/boxmac/?Page=*&limit=*:

The closest thing to actually pagination I can get with my limited experience. Uses mongoose-paginate. Replace the * with values. As of writing this README.md there's 189 rows. Hell, I don't even know if they're called rows in MongoDB.

/boxmac/:
(GET)
Returns all rows in the database in JSON.

/findID/:
Returns the information based on a given ID. Used to display product information pages.

/result/?fieldName=*&item=*:

Quick and dirty search. Both fields are required. On the site fieldName is hardcoded to Store\Brand for searching brands. Eventually when I learn more I'll make it searchable by more things.

/total/?row=*:

Returns the distinct fields of a given field. IE /total/?row=Store\Brand will return all brands (only once)
