/** @type {import("prettier").Config} */
module.exports = {
    tabWidth: 4,
    singleQuote: false,
    printWidth: 89,
    singleAttributePerLine: true,
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindFunctions: ["clsx", "twMerge", "cn", "tv", "tw"],
    tailwindConfig: "./tailwind.config.ts",
};
