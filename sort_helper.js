function refine(collection, path) {
  return path.reduce((refinement, element) => {
    try {
        return refinement[element];
      } catch (ignore) {}
    },
    collection
  );
}

// Factory for creating compare functions
function by(...keys) {
  const paths = keys.map(element => element.toString().split(".")); // Array of arrays
  return function compare(first, second) {
    let first_value;
    let second_value;
    if (paths.every(function (path) {
      first_value = refine(first, path);
      second_value = refine(second, path);
      return first_value === second_value;
    })) {
        return 0;
    }
    return (
      (
        typeof first_value === typeof second_value
        ? first_value < second_value
        : typeof first_value < typeof second_value // boolean < number < string < undefined
      )
        ? -1
        : 1
    );
  };
}

// Example of usage:
let people = [
  {first: "Frank", last: "Farkel", dateOfBirth: [1990, 12, 23]},
  {first: "Fanny", last: "Farkel", dateOfBirth: [1991, 10, 20]},
  {first: "Sparkle", last: "Farkel", dateOfBirth: [1992, 12, 13]},
  {first: "Charcoal", last: "Farkel", dateOfBirth: [1994, 12, 14]},
  {first: "Mark", last: "Farkel", dateOfBirth: [1990, 11, 17]},
  {first: "Simon", last: "Farkel", dateOfBirth: [1990, 10, 11]},
  {first: "Gar", last: "Farkel", dateOfBirth: [1990, 09, 3]},
  {first: "Ferd", last: "Berfel", dateOfBirth: [1997, 02, 23]}
];

console.log(people.sort(by("last", "first")));
console.log('---------------------------------------------------------');
console.log(people.sort(by("dateOfBirth.0", "dateOfBirth.1", "dateOfBirth.2", "last", "first")));