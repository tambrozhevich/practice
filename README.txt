npm install
mongod
Enter two lines:
mongoimport --db tanya --collection articles --file articles.json
mongoimport --db tanya --collection users --file users.json
node app.js