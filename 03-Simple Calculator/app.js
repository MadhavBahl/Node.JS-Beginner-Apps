console.log('Starting The Calculator');

const yargs = require('yargs');

var argv = yargs.argv;
var command = argv._[0];
console.log(`The Given Command Is : ${command}`);
console.log();

if(command === 'add' || command === 'sum'){
  console.log(`RESULT : ${argv.a} + ${argv.b} = `,argv.a+argv.b);
} else if(command === 'subtract' || command === 'minus'){
  console.log(`RESULT : ${argv.a} - ${argv.b} = `,argv.a-argv.b);
} else if(command === 'product' || command === 'multiply'){
  console.log(`RESULT : ${argv.a} x ${argv.b} = `,argv.a*argv.b);
} else if(command === 'divide' || command === 'quotient'){
  console.log(`RESULT : ${argv.a} / ${argv.b} = `,argv.a/argv.b);
} else{
  console.log(`${command} COMMAND NOT FOUND!!`);
}
