class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}


const simpleWrapper = Class => (...args) => new Class(...args);

const wrapper = Class => new Proxy(Class, {
  apply: (target, _, args) => new target(...args)
});

const personFunc = wrapper(Person);
const personFuncSimple = simpleWrapper(Person);

const person = personFunc('Victor', 44)
const person2 = personFuncSimple('Victor', 44)

console.log(person);
console.log(person2);
