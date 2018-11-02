const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const blockchain = require('./blockchain');
const bitcoin = new blockchain();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
const port = process.argv[2];
const rp = require("request-promise");

app.get('/blockchain', function(req, res){
	res.send(bitcoin);
});
// create a transaction 
app.post('/transactions', function(req, res){
	// const index = bitcoin.createNewTransactions(req.body.amount, req.body.sender, req.body.recipient);
	// res.json({"note":`the amount of the transaction is ${req.body.amount} bitcoin in index ${index}`});
	const newTransactions = req.body;
	const blockIndex = bitcoin.addTransactionsToPendingTransactions(newTransactions);
	res.json({
		'note' : `transactions will be added in the block ${blockIndex}`
	});
});

//broadcast the transactions tookplace 
app.post('/transactions/broadcast', (req, res)=>{
	const newTransactions = bitcoin.createNewTransactions(req.body.amount, req.body.sender, req.body.recipient);
	bitcoin.addTransactionsToPendingTransactions(newTransactions);   
	const requestPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri : networkNodeUrl + '/transactions',
			method : "POST",
			body : newTransactions,
			json : true
		};
		requestPromises.push(rp(requestOptions));
	});
	Promise.all(requestPromises).then(data => {
		res.json({'note': "transactions created and  broadcast successfully!"});
	});
});

// mine a block 
app.get('/mine', (req, res) =>{
	const lastBlock  = bitcoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transaction : bitcoin.pendingTransactions,
		index : lastBlock['index']+1
	}
	const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
	const hash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
	// bitcoin.createNewTransactions("12.5", '0', nodeAddress);
	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, hash);
	
	const requestPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl =>{
		const requestOptions = {
			uri : networkNodeUrl + '/receive-new-block',
			method : "POST",
			body : {'newBlock' : newBlock},
			json : true
		};
		requestPromises.push(rp(requestOptions));
	});
	Promise.all(requestPromises).then(data => {
		const requestOptions = {
			uri : bitcoin.currentNodeUrl + "/transactions/broadcast",
			method : "POST",
			body : {
				amount : 12.5,
				sender : "00",
				recipient : nodeAddress	
			},
			json : true
		};
		return rp(requestOptions);
	})
	res.json({
	'note' : 'new block mined and broadcast successfully',
	"block" : newBlock
	});
});
//receive new block
app.post('/receive-new-block', (req, res)=>{
	const newBlock = req.body.newBlock;
	const lastBlock = bitcoin.getLastBlock();
	const correctHash = lastBlock.hash === newBlock.previousHashBlock;
	const correctIndex  = lastBlock['index']+1 === newBlock['index'];
	if(correctHash && correctIndex){
		bitcoin.chain.push(newBlock);
		bitcoin.pendingTransactions = [];
		res.json({
			"note":"block received and accepted.",
			"newBlock" : newBlock
		});
	}else{
		res.json({
			"note": 'new block got rejected ',
			"newBlock" : newBlock
		});
	}
});
//register a node and broadcast it the network
app.post("/register-and-broadcast-node", function(req, res){
	const newNodeUrl = req.body.newNodeUrl;
	bitcoin.networkNodes.push(newNodeUrl);
	if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);
	//push all requests into this array
	const regNodesPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl =>{
		// '/request-node
		const requestOptions = {
			uri : networkNodeUrl + '/register-node',
			method : "POST",
			body : {newNodeUrl : newNodeUrl},
			json : true
		};
		regNodesPromises.push(rp(requestOptions));
	});
	Promise.all(regNodesPromises).then(data =>{
		// reverse register the current node to all the existing nodes in the network
		const bulkRegisterOptions = {
			uri : newNodeUrl + '/register-nodes-bulk',
			method : "POST",
			body : {allNetworkNodes : [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
			json : true
		};
		return rp(bulkRegisterOptions);
	}).then(data => {
		res.json({"note": "new node register with network."});
	});
});

//register a node with the network
app.post('/register-node', (req, res) =>{
	const newNodeUrl = req.body.newNodeUrl;
	// error handling 1 
  	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
	// error handlind 2
	const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

	if(nodeNotAlreadyPresent && notCurrentNode){
		bitcoin.networkNodes.push(newNodeUrl);
	}
	res.json({"note": "new node registered successfully."});
});
// register multiple node at once 
app.post('/register-nodes-bulk', (req, res)=>{
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl =>{
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
	});
	res.json({"note" : "bulk registration successful."});
});
// app.post("/jyoti", (req, res) =>{
// 	const allNetworkNodes = req.body.allNetworkNodes;
// 		allNetworkNodes.forEach(networkNodeUrl =>{
// 		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
// 	 	const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
// 		if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
// 		});
// 	res.json({"jyoti" : allNetworkNodes });
// });
app.listen(port, function(){
	console.log(`app listening on ${port}`);
});