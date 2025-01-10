class HashMap {
  constructor(loadfactor, capacity = 16) {
    this.loadfactor = loadfactor;
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31; //for better distribution to avoid collisions

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity; //% to ensure output do not become larger than the buckets length
    }

    return hashCode;
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          return bucket[i].value;
        }
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          return true;
        }
      }
    }
    return false; //if key is not found in buckets
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket.splice(i, 1); //remove item from bucket
          this.size--;
          return true;
        }
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity); //reset buckets
    this.size = 0; //reset size of #map
  }

  keys() {
    let keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          keys.push(bucket[j].key);
        }
      }
    }
    return keys; //show entire list of keys
  }

  values() {
    let values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          values.push(bucket[j].value);
        }
      }
    }
    return values; //show entire list of values
  }
}
