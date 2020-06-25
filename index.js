const app = require("./app");

app.listen(app. get ('port'), function () {
    console.log(`Backend running on http://localhost:${app.get('port')}`);
});