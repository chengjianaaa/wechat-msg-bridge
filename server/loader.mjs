import fs from "fs";
import path from "path";
import process from "process";
import Module from "module";

const builtins = Module.builtinModules;
const JS_EXTENSIONS = new Set([".js", ".mjs"]);

const baseURL = new URL("file://");
baseURL.pathname = `${process.cwd()}/`;

// 从package.json中
// 的dependencies、devDependencies获取项目所需npm模块信息
const ROOT_PATH = process.cwd();
const PKG_JSON_PATH = path.join(ROOT_PATH, "package.json");
const PKG_JSON_STR = fs.readFileSync(PKG_JSON_PATH, "binary");
const PKG_JSON = JSON.parse(PKG_JSON_STR);
// 项目所需npm模块信息
const allDependencies = {
  ...(PKG_JSON.dependencies || {}),
  ...(PKG_JSON.devDependencies || {})
};

export function resolve(specifier, parentModuleURL = baseURL, defaultResolve) {
  if (builtins.includes(specifier)) {
    return {
      url: specifier,
      format: "builtin"
    };
  }

  // 判断是否为npm模块
  if (allDependencies && typeof allDependencies[specifier] === "string") {
    return defaultResolve(specifier, parentModuleURL);
  }

  if (
    /^\.{0,2}[/]/.test(specifier) !== true &&
    !specifier.startsWith("file:")
  ) {
    // For node_modules support:
    // return defaultResolve(specifier, parentModuleURL);
    throw new Error(
      `imports must begin with '/', './', or '../'; '${specifier}' does not`
    );
  }

  const resolved = new URL(specifier, parentModuleURL);
  const ext = path.extname(resolved.pathname);
  if (!JS_EXTENSIONS.has(ext)) {
    throw new Error(
      `Cannot load file with non-JavaScript file extension ${ext}.`
    );
  }
  return {
    url: resolved.href,
    format: "esm"
  };
}
