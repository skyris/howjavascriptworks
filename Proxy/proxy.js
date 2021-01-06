//  Proxy Handler Methods:
//   --------------------
//    getPrototypeOf
//    setPrototypeOf
//    isExtensible
//    preventExtensions
//    getOwnPropertyDescriptor
//    defineProperty
//    has
//    get
//    set
//    deleteProperty
//    ownKeys
//    apply
//    construct

// Proxy on object
const person = {
  name: 'John',
  age: 34,
  jobTitle: 'Fullstack'
}

const pp = new Proxy(person, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    return prop
      .split('_')
      .map(p => target[p])
      .join(' ');
  }
})

// Proxy on function
function log(text) {
    return `Log: ${text}`;
}

const fp = new Proxy(log, {
  apply: (target, ctx, args) => target.apply(ctx, args)
})