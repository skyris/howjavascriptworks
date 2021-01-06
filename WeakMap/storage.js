// We create: storage = storage_factory()
// Then we can put our object to the storage and get key to our object
// If we put that key to (key) than we get our object back
function storage_factory() {
  const weak_map = new WeakMap();
    return {
      put(object) {
        const box = Object.freeze(Object.create(null));
        weak_map.set(box, object);
        return box;
    },
      takeBack(box) {
        return weak_map.get(box);
    }
  };
}

const our_object = {say: 'Hi!'};

const storage = storage_factory();
const key = storage.put(our_object);
const our_object_again = storage.takeBack(key);

console.log(our_object_again === our_object);
