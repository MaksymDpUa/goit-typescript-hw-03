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
  private signature: number = Math.random();
    
  getSignature(): number {
    return this.signature;
  }
}


class Person implements IPerson {
  constructor(private key: Key) { }  
    
  getKey(): Key {
    return this.key;
  }
}


abstract class House implements IHouse {
  protected door: boolean = false;
  protected tenants: Person[] = [];
    
  constructor(protected key: Key) { }
    
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