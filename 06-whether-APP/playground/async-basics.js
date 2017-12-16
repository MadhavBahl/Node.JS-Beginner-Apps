console.log('Starting APP!');

setTimeout(() => {
  console.log('Inside Of CallBack');
},2000);

setTimeout(() => {
  console.log('Inside Second CallBack');
},500);

setTimeout(() => {
  console.log('Inside Of third CallBack');
},1600);

console.log('Finishing APP');
