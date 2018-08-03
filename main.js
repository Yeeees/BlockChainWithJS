const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
       this.index = index;
       this.timestamp = timestamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash = this.calculateHash();
       //Random number for proof of work, for each time the hash will be different.
       this.nounce = 0;
    
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
    }
//Adding difficulty to mine a new block. More time consuming.
    mineBlock(difficulty){
        //Only if the number of zero at the beginning of the hash code meets the number of difficulty, the while loop would be breaked.
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: "+ this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock(){
        return new Block(0,"30/05/1993","The First Block","0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
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
newCoin.addBlock(new Block(3, "2/08/2018", {transaction: 20}));
console.log(JSON.stringify(newCoin, null, 4));
console.log("Checking Blockchain valid: " + newCoin.isChainValid());

//Try to tamper the chain.
newCoin.chain[1].data = {transaction: 100};
newCoin.chain[1].hash = newCoin.chain[1].calculateHash();

console.log("Checking Blockchain valid: " + newCoin.isChainValid());
