var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/:date', (req, res) => {

    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    if (isNaN(req.params.date)) {
        let parsedDate = Date.parse(req.params.date);
        if (isNaN(parsedDate)) {
            res.json({ "unix": null, "natural": null });
        } else {
            let mdate = new Date(parsedDate);
            res.json({ "unix": mdate.getTime() / 1000, "natural": mdate.toLocaleString("en-US", options) });
        }
    } else {
        res.json({ "unix": parseInt(req.params.date), "natural": new Date(req.params.date * 1000).toLocaleString("en-US", options) });
    }
});

app.listen(3000);