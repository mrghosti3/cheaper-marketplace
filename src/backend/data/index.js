import DevDB from "./DevDB.js";
import RemoteDB from "./RemoteDB.js";

export { DevDB };
export { RemoteDB };
export default function(env, host, port, name, user, passw, logging) {
    return (env !== "production") ? new DevDB()
        : new RemoteDB(host, port, name, user, passw, logging);
}
