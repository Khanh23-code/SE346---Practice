import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('DemoAppDB.db');

export const initDB = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        address TEXT,
        avatarUrl TEXT,
        description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS Posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userEmail TEXT NOT NULL,
        date INTEGER NOT NULL,
        description TEXT NOT NULL
      );
    `);
    console.log("Init database successfully!");
  } catch (error) {
    console.log("Error while initializing DB:", error);
  }
};


export const addUser = (userName, email, password) => {
  try {
    db.runSync(
      'INSERT INTO Users (userName, email, password, address, avatarUrl, description) VALUES (?, ?, ?, ?, ?, ?)',
      [userName, email, password, '', '', '']
    );
    return true; 
  } 
  catch (error) {
    console.log("Error while adding an user:", error);
    return false; 
  }
};

export const getUserByEmail = (email) => {
  try {
    return db.getFirstSync('SELECT * FROM Users WHERE email = ?', [email]);
  } 
  catch (error) {
    console.log("Error while searching an user:", error);
    return null;
  }
};

export const updateUser = (email, address, avatarUrl, description) => {
  try {
    db.runSync(
      'UPDATE Users SET address = ?, avatarUrl = ?, description = ? WHERE email = ?',
      [address, avatarUrl, description, email]
    );
    return true; 
  } catch (error) {
    console.log("Error while updating data:", error);
    return false;
  }
};

export const addPost = (userEmail, date, description) => {
  try {
    db.runSync(
      'INSERT INTO Posts (userEmail, date, description) VALUES (?, ?, ?)',
      [userEmail, date, description]
    );
  } catch (error) {
    console.log("Error while adding a post:", error);
  }
};
export const getAllPosts = () => {
  try {
    return db.getAllSync(`
      SELECT Posts.*, Users.userName, Users.avatarUrl 
      FROM Posts 
      INNER JOIN Users ON Posts.userEmail = Users.email 
      ORDER BY Posts.date DESC
    `);
  } catch (error) {
    console.log("Error while getting posts:", error);
    return [];
  }
};

export const clearAllData = () => {
  try {
    db.execSync(`
      DELETE FROM Users;
      DELETE FROM Posts;
    `);
    return true;
  } catch (error) {
    console.log("Lỗi xóa dữ liệu:", error);
    return false;
  }
};