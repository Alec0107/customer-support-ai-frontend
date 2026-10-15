const BASE_URL = "https://customer-service-ai-production-c797.up.railway.app";

const API = {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REGISTER: `${BASE_URL}/auth/register`,
    ME: `${BASE_URL}/auth/me`,
    USER_PROFILE: `${BASE_URL}/auth/user-profile`,

    ORDERS: `${BASE_URL}/orders/my-orders`,
    ORDERSPARTIAL: `${BASE_URL}/orders/partial`,
    ORDERID: (orderId) => `${BASE_URL}/orders/${orderId}`,
    DELIVERIES: `${BASE_URL}/deliveries/my-deliveries`,
    CHAT: `${BASE_URL}/chat`,
    CHAT_HISTORY: `${BASE_URL}/chat/history`,
};

export default API;