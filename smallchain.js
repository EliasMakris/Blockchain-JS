 'use strict';

 // --- Dependencies --- 

 var CryptoJS = require("crypto-js"); //for hash
 //var express  = require("express"); //for http server - to be added
 
 // Class declaration
  class Block {
  	constructor(ind, time, data, hash, prevHash){
  		this.ind      = ind;
  		this.time     = time;
  		this.data     = data;
  		this.hash     = hash.toString();
  		this.prevHash = prevHash.toString();
  	}
  }

 // --- Variables ---

 // variables for initial block
 var date       = new Date().getTime();
 var firstHash  = genHash(0, date, "0", "0");
 console.log("first hash: " + firstHash);
 console.log("date variable: miliseconds from 1970/01/01 = " + date); 

 // Blockchain and testchain variables
 var blockchain = [];
 var testchain  = [];

 // Latest block variable: to identify the last added block
 var lastBlock  = () => blockchain[blockchain.length -1];

// --- Main ---

 // First block genesis
  var firstBlock = () => {
  	return new Block(0, date, "first block of the chain", firstHash, "0");
  } 

 // First block insertion to the chain
 blockchain.push(firstBlock());

 // Addition of some test blocks
  for(var j=0; j<10; j++){
  	var tempBlock = newBlock(`this is block ${j+1}$`); //the data
  	addBlock(tempBlock);
  	//recursively check the chain for each new block
  	updateChain(blockchain); 
  	if(checkChain(blockchain)){
  	console.log(`Block ${j+1} was added to the chain!`)
  	console.log(`Block ${j+1} hash: ${tempBlock.hash}`)
  } 
  }

  // Test: Attempt to alternate a block
  testchain = blockchain;
  testchain[2].data = "different data";
  updateChain(testchain);
  // error message appears: change of data of existing block
  // leads to change of hash => chain not updated


// --- Functions ---

 // Hash generator (using SHA256)
  function genHash(ind, time, data, prevHash){
  	return CryptoJS.SHA256(ind + time + data + prevHash).toString();
  }


  // Hash generator with Block as input
  function genHashBlock(block){
  	return genHash(block.ind, block.time, block.data, block.prevHash);
  }


  // Function for creating new block
  function newBlock(newData){
  	var prevBlock = lastBlock() ; //identify previous block
  	var newInd    = prevBlock.ind + 1;
  	var newTime   = new Date().getTime();
  	var newHash   = genHash(newInd, newTime, newData, prevBlock.hash);
  	return new Block(newInd, newTime, newData, newHash, prevBlock.hash);
  }

  // Function for checking a block to be added
  function checkBlock(nextBlock, prevBlock){
  	if(prevBlock.ind + 1 !== nextBlock.ind){
  		console.log('check: index mismatch');
  		return false;
  	} else if(genHashBlock(nextBlock) !== nextBlock.hash){
  		console.log('check: hash mismatch');
  		console.log('calculated hash: ' + genHashBlock(nextBlock));
  		console.log('of type ' + typeof(genHashBlock(nextBlock)));
  		console.log('recorded hash: ' + nextBlock.hash);
  		console.log('of type ' + typeof(nextBlock.hash));
  		return false;
  	} else if(prevBlock.hash !== nextBlock.prevHash){
  		console.log('check: previous hash mismatch');
  		return false;
  	}
  	return true;
  }

  // Function attempting to add the block. This function:
   // 1. Checks new potential block using the function checkBlock
   // 2. Adds the block to the chain if the checkout was successul
   function addBlock(nextBlock){
   	if(checkBlock(nextBlock, lastBlock())){
   		blockchain.push(nextBlock);
   		//console.log('new block added successfully!');
   		console.log('index of new block: ' + nextBlock.ind);
   	}
   }

   // Function to check the chain. This function:
    // checks if the relation of attributes between each successive
    // pair of blocks is maintained when the chain is to be updated
   function checkChain(chain){
   	if(chain.length == 0){return false;}
   	var temp = [chain[0]];
   	for(var i=1; i < chain.length; i++){
   		if(checkBlock(chain[i], temp[i-1])){
   			temp.push(chain[i]);
   		} else {
   			console.log('chain broken at blocks ' + i + ', '+ i-1);
   			return false;
   		}
   	}
      return true;
   }

  // Function to update chain. This function:
   // 1. Checks the chain using the checkChain function
   // 2. Updates the chain is the checkout was successful
  function updateChain(newChain){
  	if (checkChain(newChain)){
  		console.log('Blockchain updated');
  		blockchain = newChain;
  	} else {
  		console.log('Attempt to update blockchain failed - invalid new chain');
  	}
  }

