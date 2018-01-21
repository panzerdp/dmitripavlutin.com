const cat = {
  legs: 4,
  sound: 'meow'
};
const dog = {
  ...cat,
  sound: 'woof'
};

console.log(dog); // => { legs: 4, sounds: 'woof' }