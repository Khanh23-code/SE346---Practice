import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('AppDB.db');

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
    const statement = db.prepareSync(
      'INSERT INTO Users (userName, email, password, address, avatarUrl, description) VALUES (?, ?, ?, ?, ?, ?)'
    );
    statement.executeSync([userName, email, password, '', '', '']);
    return true; 
  } 
  catch (error) 
  {
    console.log("Error while adding an user:", error);
    return false; 
  }
};

export const getUserByEmail = (email) => {
  try {
    const statement = db.prepareSync('SELECT * FROM Users WHERE email = ?');
    const result = statement.executeSync([email]);
    return result.getFirstSync(); 
  } catch (error) {
    console.log("Error while searching an user:", error);
    return null;
  }
};

export const addPost = (userEmail, date, description) => {
  try {
    const statement = db.prepareSync('INSERT INTO Posts (userEmail, date, description) VALUES (?, ?, ?)');
    statement.executeSync([userEmail, date, description]);
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
    console.log("Lỗi lấy danh sách posts:", error);
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