export function jwtConfig() {
    return {
            secret: process.env.JWT_KEY,
            signOptions: {expiresIn: "30m"},
        }
}