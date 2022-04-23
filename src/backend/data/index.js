import DevDB from "./DevDB.js";
import RemoteDB from "./RemoteDB.js";

export { DevDB };
export { RemoteDB };
export default function(env, host, port, name, user, passw) {
    return (env == "dev") ? new DevDB() : new RemoteDB(host, port, name, user, passw);
}
