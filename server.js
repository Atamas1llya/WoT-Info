const express = require('express')
const app = express();
const port = 7000; 

app.use(express.static(__dirname + '/public'))

app.listen(port, () => {
	console.log(`Lets go to ${port}!`);
})
