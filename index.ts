import { app } from "./app";
import { setup } from "./discord";

const port = process.env.PORT || '3000'
app.listen(port, () => {
	console.log(`App Listening on port ${port}`)
    console.log(`http://localhost:3000`)
});

setup();