const API = {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    ME: "/api/auth/me",

    USER_PROFILE: "/api/auth/user-profile",

    ORDERS: "/api/orders/my-orders",
    ORDERSPARTIAL: "/api/orders/partial",
    ORDERID: (orderId) => `/api/orders/my-orders/${orderId}`,
    DELIVERIES: "/api/deliveries/my-deliveries",
    CHAT: "/api/chat",
    CHAT_HISTORY: "/api/chat/history",
}

export default API;