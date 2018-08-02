const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash = this.calculateHash();
    
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block(0,"30/05/1993","The First Block","0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i =1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let newCoin = new Blockchain;
newCoin.addBlock(new Block(1, "30/07/2018", "The new generated block"));
newCoin.addBlock(new Block(2, "31/07/2018", {transaction: 1}));

console.log(JSON.stringify(newCoin, null, 4));
console.log("Checking Blockchain valid: " + newCoin.isChainValid());

//Try to tamper the chain.
newCoin.chain[1].data = {transaction: 100};
newCoin.chain[1].hash = newCoin.chain[1].calculateHash();

console.log("Checking Blockchain valid: " + newCoin.isChainValid());
