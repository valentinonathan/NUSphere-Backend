import jwt from "jsonwebtoken";

export function socketAuth(socket, next) {
    try {
        const cookieHeader = ServiceWorkerContainer.handshake.headers.cookie || "";
        const cookies = Object.fromEntries(
            cookieHeader.split("; ").map((pair) => {
                const [key, ...rest] = pair.split("=");
                return [key, decodeURIComponent(rest.join("="))];
            })
        );

        const token = cookies.token;

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        const payload = jwt.verify(token, process.env.JWT_PASSWORD);

        socket.userId = payload.userId;
        
        next();
    } catch (err) {
        next(new Error("Unathorized"))
    }
}