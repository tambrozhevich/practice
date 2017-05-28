npm install
запустить mongod
ввести следующие две строки:
mongoimport --db tanya --collection articles --file articles.json
mongoimport --db tanya --collection users --file users.json
затем только запустить node app.js