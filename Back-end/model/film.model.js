import database from "../connection/database/db.js";

export default function CRUD() {
  return {
    async Create(entity) {
      return await database("film").insert(entity);
    },

    async Read() {
      return await database("film");
    },

    async Update(id, entity) {
      const result = await database("film").where("film_id", id).update(entity);

      if (result !== 0) return id;
      else return -1;
    },

    async Delete(id) {
      const result = await database("film").where("film_id", id).del();

      if (result !== 0) return id;
      else return -1;
    },
  };
}
