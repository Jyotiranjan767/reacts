const Blockchain  = require('./blockchain')
const bitcoin = new Blockchain();
bitcoin.createNewBlock(2390, '4294823r9','239jr92r'); 
bitcoin.createNewTransactions(200, "sender32820rjje", "recipient3829r");
// console.log(bitcoin.createNewTransactions());

const currentBlockData = {
	"amount" : 8429,
	"sender" : "rr9339t3t9t98t",
	"recipient" : "nfefh847th93t"
}
const previousHashBlock = bitcoin.getLastBlock()['hash']; 
bitcoin.createNewBlock(2391, '41294823r9','2339jr92r'); 
console.log(bitcoin.getLastBlock());
const mine = bitcoin.proofOfWork(previousHashBlock, currentBlockData);
console.log(mine);