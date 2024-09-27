export function validateLogin(username: string, password: string): boolean {
    // Dummy validation logic
    if (username === "admin" && password === "password") {
        return true;
    } else {
        return false;
    }
}