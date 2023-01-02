const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'a84aef59d8afa4fa42fe4333257e63f17834387519852216c86442793095bde0';

app.post('/gift', async(req, res) => {  
  const merkleTree = new MerkleTree(niceList);
  // grab the parameters from the front-end here
  const name = req.body.name;
  const proof = req.body.proof;
  
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
