export class HashMap {
  constructor(loadfactor = 0.75, capacity = 16) {
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

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];

    // Check if the key exists and update its value
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return;
      }
    }

    bucket.push({ key, value });
    this.size++;
    //if the load factory
    if (this.size / this.capacity > this.loadfactor) {
      this.resize();
    }
  }

  resize() {
    this.capacity *= 2;
    const newBuckets = new Array(this.capacity);
    //iterate through old #map and rehash every item into new buckets
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const { key, value } = bucket[j];
          const newIndex = this.hash(key);

          //if index is empty initialize it to a new array
          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = [];
          }
          newBuckets[newIndex].push({ key, value });
        }
      }
    }
    this.buckets = newBuckets;
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

  entries() {
    let entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          entries.push([bucket[j].key, bucket[j].value]);
        }
      }
    }
    return entries; //show entire list of key and value pair
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver"); //when added the lenght + 1 and the Capacity doubled by the resize

console.log(test.length()); // Should print the number of elements: 12 when exceed 13
console.log(test.capacity); //print 16 (default capacity) when exceed 32

console.log(JSON.stringify(test.buckets)); //distributiion of elements

console.log("Overwrite Area");

test.set("apple", "red");
console.log(test.get("apple")); // Logs red
test.set("apple", "green");
console.log(test.get("apple")); // Logs green
console.log("Final get:", test.get("apple")); // Logs green

test.set("elephant", "grey");
console.log(test.get("elephant"));

test.set("elephant", "pink");
console.log(test.get("elephant"));

console.log(test.has("lion")); //return as true
console.log(test.has("zibra")); //return as false

console.log(test.remove("kite")); //removed item
console.log(test.length());

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.clear();
console.log(test.length()); //0
console.log(test.get("banana")); // null
