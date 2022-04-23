import database from "./connect.js";

export async function Create(payload) {
    // console.log(payload)
    await database('film').insert(payload);
    // console.log(res)

}