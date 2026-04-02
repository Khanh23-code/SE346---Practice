import * as SQLite from 'expo-sqlite';

export const DEFAULT_AVATAR = "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png";
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
        userName TEXT NOT NULL,
        date INTEGER NOT NULL,
        description TEXT NOT NULL,
        isLove INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS Comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER NOT NULL,
        userName TEXT NOT NULL,
        date INTEGER NOT NULL,
        description TEXT NOT NULL,
        isLove INTEGER DEFAULT 0
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
      [userName, email, password, '', DEFAULT_AVATAR, '']
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

export const updateUser = (userName, address, avatarUrl, description) => {
  try {
    db.runSync(
      'UPDATE Users SET address = ?, avatarUrl = ?, description = ? WHERE userName = ?',
      [address, avatarUrl, description, userName]
    );
    return true; 
  } catch (error) {
    console.log("Error while updating data:", error);
    return false;
  }
};

export const addPost = (userName, date, description) => {
  try {
    db.runSync(
      'INSERT INTO Posts (userName, date, description, isLove) VALUES (?, ?, ?, 0)',
      [userName, date, description]
    );
  } catch (error) {
    console.log("Error while adding a post:", error);
  }
};

export const updatePostLove = (postId, isLove) => {
  try {
    db.runSync(
      'UPDATE Posts SET isLove = ? WHERE id = ?',
      [isLove ? 1 : 0, postId] 
    );
    return true;
  } catch (error) {
    console.log("Error while updating like:", error);
    return false;
  }
};

export const getAllPosts = () => {
  try {
    return db.getAllSync(`
      SELECT Posts.*, Users.userName, Users.avatarUrl 
      FROM Posts 
      INNER JOIN Users ON Posts.userName = Users.userName 
      ORDER BY Posts.date DESC
    `);
  } catch (error) {
    console.log("Error while getting posts:", error);
    return [];
  }
};

export const addComment = (postId, userName, date, description) => {
  try {
    db.runSync(
      'INSERT INTO Comments (postId, userName, date, description, isLove) VALUES (?, ?, ?, ?, 0)',
      [postId, userName, date, description]
    );
    return true;
  } catch (error) {
    console.log("Error while adding comment:", error);
    return false;
  }
};

export const getCommentsByPostId = (postId) => {
  try {
    return db.getAllSync(
      'SELECT * FROM Comments WHERE postId = ? ORDER BY date DESC',
      [postId]
    );
  } catch (error) {
    console.log("Error while getting comments:", error);
    return [];
  }
};

export const clearAllData = () => {
  try {
    db.execSync(`
      DROP TABLE IF EXISTS Users;
      DROP TABLE IF EXISTS Posts;
      DROP TABLE IF EXISTS Comments;
    `);
    return true;
  } catch (error) {
    console.log("Lỗi xóa dữ liệu:", error);
    return false;
  }
};