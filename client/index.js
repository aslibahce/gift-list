const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = "Lila Fay";
  const merkleTree = new MerkleTree(niceList); 
  const index = niceList.findIndex(x => x == name);
  const merkleProof = merkleTree.getProof(index);
  
  //console.log(merkleTree.getRoot().toString("hex"));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: merkleProof
  });

  console.log({ gift });
}

main();