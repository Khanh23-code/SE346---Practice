const BASE_URL = 'http://blackntt.net:4321';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {

    throw new Error(data.detail || data.message || 'Error!');
  }
  return data;
};

export const api = {
  // 1. Đăng ký người dùng
  register: async (email, password, name, description = "") => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          description: description,
        }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Register Error:", error);
      throw error;
    }
  },

  // 2. Đăng nhập
  // Lưu ý: Tài liệu yêu cầu truyền email và password qua Query Parameters
  login: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login?email=${email}&password=${password}`, {
        method: 'POST',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Login Error:", error);
      throw error;
    }
  },

  // 3. Lấy thông tin cá nhân qua email
  getProfile: async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/${email}`, {
        method: 'GET',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Get Profile Error:", error);
      throw error;
    }
  },

  // 4. Tạo bài đăng mới
  // Chú ý: API cần title, description và creator_email
  createPost: async (title, description, creatorEmail) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          creator_email: creatorEmail,
        }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Create Post Error:", error);
      throw error;
    }
  },

  // 5. Lấy tất cả bài đăng
  getAllPosts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'GET',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Get All Posts Error:", error);
      return []; // Trả về mảng rỗng nếu lỗi để tránh crash giao diện
    }
  },

  // 6. Lấy chi tiết bài đăng bằng ID
  getPostById: async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'GET',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Get Post ID Error:", error);
      throw error;
    }
  },

  // 7. Xóa bài đăng
  deletePost: async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("API Delete Post Error:", error);
      throw error;
    }
  },
};