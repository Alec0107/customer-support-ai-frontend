
const BASE_URL = "https://customer-service-ai-production-c797.up.railway.app";

const API = {
    LOGIN: `${BASE_URL}/api/auth/login`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    ME: `${BASE_URL}/api/auth/me`,

    USER_PROFILE: `${BASE_URL}/api/auth/user-profile`,

    ORDERS: `${BASE_URL}/api/orders/my-orders`,
    ORDERSPARTIAL: `${BASE_URL}/api/orders/partial`,
    ORDERID: (orderId) => `${BASE_URL}/api/orders/${orderId}`,
    DELIVERIES: `${BASE_URL}/api/deliveries/my-deliveries`,
    CHAT: `${BASE_URL}/api/chat`,
    CHAT_HISTORY: `${BASE_URL}/api/chat/history`,
};

export default API;
