const fs = require('fs');
const os = require('os');
const path = require('path');
console.log(path.basename('/test/something')); //something
console.log(path.basename('/test/something.txt')); //something.txt
console.log(path.basename('/test/something.txt', '.txt')); //something
console.log(path.parse('/users/test.txt'));
console.log(path.resolve('hello.js'));
//console.log(os.cpus());
//console.log(os.freemem());

fs.readFile('/Users/AdvancedUser/.npmrc', 'utf8', (err, data) => {
	if (err) {
		console.log(err)
		return;
	}
	
	console.log(data);
})

const content = "Some content!"

fs.writeFile("/Users/AdvancedUser/nodetest.txt", content, { flag: "a+" }, (err) => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})

fs.stat("/Users/AdvancedUser/nodetest.txt", (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats.isFile()) //true
  console.log(stats.isDirectory()) //false
  console.log(stats.isSymbolicLink()) //false
  console.log(stats.size) //1024000
})

fs.readdir('/Users/AdvancedUser/Workspace', (err, result) => {
	console.log(result)
})