import { createDbWorker } from "sql.js-httpvfs";

// sadly there's no good way to package workers and wasm directly so you need a way to get these two URLs from your bundler.
// This is the webpack5 way to create a asset bundle of the worker and wasm:
const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
// the legacy webpack4 way is something like `import wasmUrl from "file-loader!sql.js-httpvfs/dist/sql-wasm.wasm"`.

// the config is either the url to the create_db script, or a inline configuration:
const DB_CONFIG = {
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: "http://localhost:5173/data.sqlite3", // url to the database (relative or full)
  },
};

let MAX_BYTES_TO_READ = 10 * 1024 * 1024;
// you can also pass multiple config objects which can then be used as separate database schemas with `ATTACH virtualFilename as schemaname`, where virtualFilename is also set in the config object.

// worker.db is a now SQL.js instance except that all functions return Promises.

const initWorkerPromise = createDbWorker(
  [DB_CONFIG],
  workerUrl.toString(),
  wasmUrl.toString(),
  MAX_BYTES_TO_READ
);

/**
 * Executes an SQL query against the remote SQLite database
 * @param {string} sql - The SQL query string
 * @param {any[]} params - Parameters for the query
 * @returns {Promise<any[]>} The query results
 */
export default async function sqljs(sql, params) {
  try {
    const worker = await initWorkerPromise;

    const result = await worker.db.exec(sql, params);

    // worker.worker.bytesRead is a Promise for the number of bytes read by the worker.
    // if a request would cause it to exceed maxBytesToRead, that request will throw a SQLite disk I/O error.
    console.log(await worker.worker.bytesRead);

    // you can reset bytesRead by assigning to it:
    worker.worker.bytesRead = 0;

    return result;
  } catch (err) {
    console.error("SQL query error:", err);
  }
}
