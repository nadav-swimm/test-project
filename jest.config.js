module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "js",
        "json",
        "vue",
    ],
    transform: {
        ".*\\.(vue)$": "vue-jest",
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.svg$": "<rootDir>/svgTransform.js" 
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/components/**/*.{js,vue}",
        "!**/node_modules/**"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~/(.*)$': '<rootDir>/$1',
    },
    coverageReporters: [
        "html",
        "text-summary"
    ],
}