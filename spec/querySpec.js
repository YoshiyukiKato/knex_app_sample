var Promise = require("bluebird");
var knex = require("knex")({
	client: 'pg',
	user     : 'yoshiyuki',
 	database : 'yoshiyuki',
	migrations: {
		tableName: 'knex_migrations'
	}
});

//Promise.promisifyAll(knex);



knex.select("*").from("users").where("name","taro").then(function(a,b){
    console.log(a);
});
