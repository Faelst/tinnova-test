class Voters {
    constructor(total, valid, blank, nulls) {
        this.total = total
        this.valid = valid
        this.blank = blank
        this.nulls = nulls
    }

    percentValidVotesRelationTotalVoters() {
        return (this.valid / this.total) * 100
    }

    percentBlankVotesRelationTotalVoters(){
        return (this.blank / this.total) * 100
    }
    
    percentNullVotesRelationTotalVoters(){
        return (this.nulls / this.total) * 100
    }
}

const voters = new Voters(1000, 800, 150, 50)

console.log(`O percentual dos votos validos em relação ao total de eleitores: ${voters.percentValidVotesRelationTotalVoters()}%`)
console.log(`O percentual dos votos em branco em relação ao total de eleitores: ${voters.percentBlankVotesRelationTotalVoters()}%`)
console.log(`O percentual dos votos nulos em relação ao total de eleitores: ${voters.percentNullVotesRelationTotalVoters()}%`)
