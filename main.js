const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash = '';
    
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [];

    }

    createGenesisBlock(){
        return new Block(0,"30/05/1993","The First Block","000");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let newCoin = new Blockchain;
newCoin.addBlock(new Block(1, "30/07/2018", "The new generated block"));
newCoin.addBlock(new Block(2, "31/07/2018", {transaction: 1}));

console.log(JSON.stringify(newCoin, null, 4));