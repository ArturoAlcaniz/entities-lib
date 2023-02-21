const withImages = require("next-images");

module.exports = withImages({
    images: {
        disableStaticImages: true,
    },
    env: {
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    },
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "x-frame-options",
                        value: "deny",
                    },
                    {
                        key: "x-content-type-options",
                        value: "nosniff",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/api/users/:path*",
                destination: `http://${process.env.USERS_CONTAINER_NAME}:${process.env.USERS_CONTAINER_PORT}/users/:path*`,
            },
            {
                source: "/api/sessions/:path*",
                destination: `http://${process.env.USERS_CONTAINER_NAME}:${process.env.USERS_CONTAINER_PORT}/sessions/:path*`,
            },
            {
                source: "/api/products/:path*",
                destination: `http://${process.env.PRODUCTS_CONTAINER_NAME}:${process.env.PRODUCTS_CONTAINER_PORT}/products/:path*`,
            },
        ];
    },
    webpack: (config, {webpack}) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                React: "react",
            })
        );
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    poweredByHeader: false,
});
