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
exports.initDocs = void 0;
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const promise_1 = __importDefault(require("git-clone/promise"));
const path_1 = __importDefault(require("path"));
/**
 * @module init-docs
 * @description init docs directory
 */
/**
 * @exports initDocs "jsdoc2vitepress init" init docs directory
 * @returns {Promise} Return promise to check if init success
 */
const initDocs = () => __awaiter(void 0, void 0, void 0, function* () {
    const loading = (0, ora_1.default)('Init docs directory');
    try {
        const templateGitUrl = 'https://github.com/luciozhang/jsdoc2vitepress-template.git';
        const docsDir = path_1.default.resolve(process.cwd(), 'docs');
        yield (0, promise_1.default)(templateGitUrl, docsDir, { checkout: 'master', shallow: true });
        fs_extra_1.default.removeSync(path_1.default.join(docsDir, '.git'));
        loading.succeed('Init docs directory success');
    }
    catch (error) {
        loading.fail(`Init docs directory fail: ${error}\nPlease delete local 'docs' directory and retry.`);
    }
});
exports.initDocs = initDocs;
//# sourceMappingURL=init-docs.js.map