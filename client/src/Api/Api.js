import axios from "axios";

const BACKEND_URL = "http://localhost:5341";

export const login = (Email, Password) => {
  return axios.post(`${BACKEND_URL}/api/Account/login`, {
    Email,
    Password,
  });
};

export const signup = (
  Email,
  FristName,
  LastName,
  Password,
  ConfirmPassword
) => {
  return axios.post(`${BACKEND_URL}/api/Account/register`, {
    Email,
    FristName,
    LastName,
    Password,
    ConfirmPassword,
  });
};

export const refreshToken = (refreshToken) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  return axios.post(
    `${BACKEND_URL}/api/Account/RefreshToken`,
    {
      refreshToken,
    },
    config
  );
};

export const createConversation = async (title, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/Conversation/CreateConversation`,
    {
      Title: title,
    },
    config
  );

  return response.data;
};

export const fetchConversations = async (pageNumber, pageSize, token) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/Conversation/GetAllUserConversations`,
      {
        params: {
          pageNumber,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching conversations:", error);
    throw error;
  }
};

export const deleteConversation = async (conversationId, authToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/Conversation/DeleteConversation`,
    {
      id: conversationId,
    },
    config
  );
  return response.data;
};

export const fetchComments = async (
  conversationId,
  pageNumber,
  pageSize,
  token
) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/Comment/GetAllConversationComments`,
      {
        params: {
          conversationId,
          pageNumber,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching conversations:", error);
    throw error;
  }
};

export const postComment = async (conversationId, commentText, token) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/Comment/PostComment`,
      {
        conversationId: conversationId,
        text: commentText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error posting comment:", error);
    throw error;
  }
};

export const postCommentReply = async (
  conversationId,
  replyText,
  token,
  commentId
) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/Comment/ReplyToComment`,
      {
        conversationId: conversationId,
        text: replyText,
        CommentId: commentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error posting comment reply:", error);
    throw error;
  }
};

export const getReplyComments = async (commentId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/Comment/GetCommentReply?id=${commentId}`
    );
    return response;
  } catch (error) {
    console.log("Error fetching reply comments:", error);
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/Account/ForgetPassword`,
      {
        email: email,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error forgetting password:", error);
    throw error;
  }
};
