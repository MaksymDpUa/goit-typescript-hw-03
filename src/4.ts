interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

interface IHouse {
  openDoor(key: IKey): void;
  comeIn(person: IPerson): void;
}




class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.random();
    }    
  getSignature(): number {
    return this.signature;
  }
}


class Person implements IPerson {
  private key: Key;
  constructor(key: Key) {
    this.key = key;
    }    
  getKey(): Key {
    return this.key;
  }
}


abstract class House implements IHouse {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];
    
  constructor(key: Key) {
    this.key = key;
  }
  abstract openDoor(key: Key): void;
  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    } else {
      console.log("The door is closed.");
    }
  }
}


class MyHouse extends House implements House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    } else {
      console.log("Invalid key.");
    }
  }
}


const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};