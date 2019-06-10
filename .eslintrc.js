module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "mocha": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "classes": true,
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/display-name": 1,
        "react/no-render-return-value": 0,
        "indent": ["error", 2],
        "linebreak-style": [
            0
        ],
        "quotes": [
            "error",
            "double",
            { "allowTemplateLiterals": true }
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
