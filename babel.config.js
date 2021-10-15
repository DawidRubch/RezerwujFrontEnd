module.exports = function(api) {
    api.cache(false);
    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: {
                        node:"current",
                        browsers: [
                            "last 2 Chrome versions",
                            "last 2 Edge versions",
                            "last 2 Firefox versions",
                            "last 2 Safari versions",
                            "IE 11",
                        ],
                        
                    },
                    loose: true,
                    modules: false,
                    useBuiltIns: "usage",
                    corejs: {
                        version: 3,
                        proposals: true,
                    },
                },
            ],
            "@babel/preset-react",
            "@babel/preset-flow"
        ],
        plugins: [
            ["module-resolver", {
                "root": ["./"],
                "alias": {
                    "@pages": "./interface/pages",
                    "@components": "./interface/components",
                    "@routes": "./routes.ts",
                    "@core": "./core",
                    "@hooks": "./hooks",
                    "@data": "./src/data",
                    "@domain": "./domain",
                    "@images": "./images",

                }
            }],
            "@babel/plugin-transform-spread",
            "@babel/plugin-syntax-dynamic-import", [
                "@babel/plugin-proposal-class-properties",
                {
                    loose: false,
                },
            ],
        ],
        ignore: ["node_modules"],
        overrides: [{
            test: ["./src/**/*.ts", "./src/**/*.tsx"],
            presets: [
                "@babel/preset-typescript", [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: "current",
                        },
                    },
                ],
                "@babel/preset-react",
            ],
        }, ],
        env: {
            test: {
                plugins: ["babel-plugin-rewire-ts"],
                presets: ["@babel/preset-typescript", "@babel/preset-react"],
            },
        },
    };
};