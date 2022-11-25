"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVitePress = exports.startVitePress = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
/**
 * @module md-to-vitepress
 * @description Generates VitePress API documentation from jsdoc annotated source code.
 */
/**
 * @exports startVitePress Run VitePress server
 * @returns {Promise} Return promise to check if run success
 */
const startVitePress = () => __awaiter(void 0, void 0, void 0, function* () {
    shelljs_1.default.exec('node_modules/.bin//vitepress dev docs');
});
exports.startVitePress = startVitePress;
/**
 * @exports buildVitePress build VitePress server
 * @returns {Promise} Return promise to check if build success
 */
const buildVitePress = () => __awaiter(void 0, void 0, void 0, function* () {
    shelljs_1.default.exec('node_modules/.bin/vitepress build docs');
});
exports.buildVitePress = buildVitePress;
//# sourceMappingURL=md-to-vitepress.js.map