class HashMap{
    constructor(loadfactor, capacity = 10){
        this.loadfactor = loadfactor;
        this.capacity = capacity;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
    
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
    
        return hashCode;
      }
      
}
