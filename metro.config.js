const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(process.cwd());
config.resolver.sourceExts.push("sql");
module.exports = config;
