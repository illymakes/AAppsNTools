//check that the favorites are working correctly at home

import { openDB } from 'idb';

async function initDB() {
  const db = await openDB('favoritesDB', 1, {
    upgrade(db) {
      db.createObjectStore('favorites', { keyPath: ['id', 'category'] });
    },
  });
  return db;
}

export async function addFavorite(item) {
  const db = await initDB();
  await db.add('favorites', item);
}

export async function removeFavorite(id, category) {
  const db = await initDB();
  await db.delete('favorites', [id, category]);
}

export async function checkFavorite(id, category) {
  const db = await initDB();
  const item = await db.get('favorites', [id, category]);
  console.log("checkFavorite item: ", item);
  return !!item;
}

export async function getFavorites() {
  const db = await initDB();
  return db.getAll('favorites');
}
