var key = require('./api-key');
const express = require('express');
const yelp = require ('yelp-fusion');
const client = yelp.client(key.apiKey);

const app = express();

/*Search by term and location  */
app.get('/api/restaurants', (req, res) => {
  var term =req.query.term;
  var location = req.query.location;
  client.search({
    term,
    location,
    "limit":5
  })
  .then(response=>{
    res.json(response);
  })
});
/*Search by business ID */
app.get('/api/restaurantHours',(req,res)=>{
  var id = req.query.id;
  client.business(id)
  .then(response=>res.json(response))
})
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));