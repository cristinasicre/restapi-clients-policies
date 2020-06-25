const app = require("./app");

app.listen(app. get ('port'), function () {
    console.log(`API running on http://localhost:${app.get('port')}`);
});