import database from "../connection/database/db.js";

export default function CRUD() {
  return {
      async Create(entity){
          return await database('film').insert(entity);
      },

      async Read(){
          return await database('film');
      },

      async Update(id, entity){
          return await database('film').where('film_id', id).update(entity);
      },

      async Delete(id){
          return await database('film').where('film_id', id).del();
      }
  }
}
