module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "js",
        "json",
        "vue",
    ],
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
