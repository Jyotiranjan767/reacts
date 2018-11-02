const sha256 = require('js-sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');

function Blockchain(){
	this.chain = [];
	this.pendingTransactions = [];
	this.currentNodeUrl = currentNodeUrl;
	this.networkNodes = [];
	this.createNewBlock('100','0','0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousHashBlock, hash){
	const newBlock = {
		index : this.chain.length +1,
		nonce : nonce,
		timestamp : Date.now(),
		transactions : this.pendingTransactions,
		previousHashBlock : previousHashBlock,
		hash : hash
	};
	this.pendingTransactions = [];
	this.chain.push(newBlock);
	return newBlock;
}
Blockchain.prototype.getLastBlock  = function(){
	return this.chain[this.chain.length -1];
}
Blockchain.prototype.createNewTransactions = function(amount, sender, recipient){
	const newTransaction  = {
		amount : amount,
		sender : sender,
		recipient : recipient,
		transactionId : uuid().split('-').join('')
	};
	// this.pendingTransactions.push(newTransaction);
	// return this.getLastBlock()['index']+1;
	return newTransaction;
}
Blockchain.prototype.addTransactionsToPendingTransactions = function(transactionObj){
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index']+1;
}
Blockchain.prototype.hashBlock = function(previousHashBlock, currentBlockData, nonce){
	const dataAsString = previousHashBlock + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
}
Blockchain.prototype.proofOfWork = function(previousHashBlock, currentBlockData){
	let nonce = 0;
	let hash = this.hashBlock(previousHashBlock, currentBlockData, nonce);
	while(hash.substring(0, 4) !== '0000'){
		 nonce += 1;
		 hash = this.hashBlock(previousHashBlock, currentBlockData, nonce);
		 // only for testing 
		  console.log(hash);
	}
	console.log(nonce);
	return nonce;
}

module.exports = Blockchain;// constructor function name 