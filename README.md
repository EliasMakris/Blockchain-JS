# Blockchain-JS
A small task implementing the most basic principles of Blockchain technology

### Structure & info

This small (ongoing) code is initially designed for demonstration purposes. A class of blocks is created, encompassing the most important attributes of a block: _index_, _timestamp_, the _data_ contained, the _previous hash_ string and of course, its own _hash_. For the hash generation, _**crypto-js**_ library is used (function **SHA25**). 

All blocks, including the first (genesis) block are set to have a hash which depends on the block's timestamp, among other attributes. That is equal to whatever **date().getTime()** function returns at the moment of each block's creation (which is equal to the number of miliseconds counting form 1970/01/01 until now).

There are functions for creating a new block given some input data (**newBlock**), for checking a potential new block with respect to the last block's index and hash (**checkBlock**) and finally for adding this block to the chain (**addBlock**). There are also functions to ensure that the chain is unaltered (**checkChain**) before proceeding with its update (**updateChain**). All of those functions are grouped together at the last part of the code.

### Test Blocks

Ten test blocks (of dummie input data) are added to the chain after the genesis block is created ("manually", using a fixed loop). Before each block's creation, the **checkBlock** function is called to determine the validity of the block, and before the chain is updated, the **checkChain** function scans the chain for inconsistencies. The indexes and hash strings of the blocks appear on the command prompt (of _**Node.js**_).

### Attempt to change an existing block

Alternating the data of an existing block should not be allowed. Using a replica of the blockchain ("testchain") and changing a random block's data, leads to a different hash of the block and **checkChain** function creates an error, as it should. This stops a possible attempt to harm the blockchain once created. 

### _To be added_
- A web server, so there can be user interaction with the chain
- Some simple Proof of Work attribute
- Some sort of meaningful input data to the blocks
