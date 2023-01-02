const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const name = "Brijesh Agal";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  // TODO: how do we prove to the server we're on the nice list?

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof,
  });

  console.log({ gift });
  // if(gift)
}

main();
