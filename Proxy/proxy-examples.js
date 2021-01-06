// Wrapper
const withDefaultValue = (target, defaultValue = 0) => new Proxy(target, {
  get: (obj, key) => (key in obj) ? obj[key] : defaultValue
});

const position = withDefaultValue({
  x: 24,
  y: 56,
}, 100)

console.log(position.x);
console.log(position.z);

// Hidden properties
const withHiddenProperties = (target, prefix = '_') => {
  return new Proxy(target, {
    has: (obj, prop) => prop in obj && !prop.startsWith(prefix),
    ownKeys: obj => Reflect.ownKeys(obj).filter(p => p.startsWith(prefix)),
    get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0)
  })
}

const o = withHiddenProperties({
  name: 'Victor',
  _age: 44,
  job: 'developer'
});

console.log(o.name);
console.log(o._age);


// Optimization
const IndexedArray = new Proxy(Array, {
  // proxy on class
  construct(target, {0: args}) {
    // target - Array Function (Array Constructor)
    // args - all arguments in array which will get a newTarget constructor
    const index = args.reduce((res, key) => (res[key.id] = key, res), {});
    
    return new Proxy(new target(...args), {  // proxy on class instance
      // new Array(не массив, а элементы через запятую)
      get(arr, prop) {
        switch (prop) {
          case 'push':
            return item => {
              index[item.id] = item;
              arr[prop].call(arr, index)
            }
          case 'findById':
            return id => index[id]
          default:
            return arr[prop];
        }
      }
    });
  }
});

const array = [
  { id: 11, name: 'Victor', job: 'Fullstack developer'},
  { id: 12, name: 'John', job: 'Frontend dev'},
  { id: 13, name: 'Tom', job: 'React dev'},
  { id: 14, name: 'Bill', job: 'Vue dev'},
];

const users = new IndexedArray(array);
console.log(users);
users.push( {id: 100, name: 'Newbie', job: 'HTML/CSS dev'})
console.log(users);
console.log(users.findById(100));