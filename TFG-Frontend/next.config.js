const withImages = require("next-images");

module.exports = withImages({
    images: {
        disableStaticImages: true,
    },
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "x-frame-options",
                        value: "SAMEORIGIN",
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
                source: "/api/:path*",
                destination: "http://TFG-Backend:3020/:path*",
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
