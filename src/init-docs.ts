import ora from 'ora';
import fs from 'fs-extra';
import gitclone from 'git-clone/promise';
import path from 'path';

/**
 * @module init-docs
 * @description init docs directory
 */

/**
 * @exports initDocs "jsdoc2vitepress init" init docs directory
 * @returns {Promise} Return promise to check if init success
 */
export const initDocs = async () => {
  const loading = ora('Init docs directory');
  try {
    const templateGitUrl = 'https://github.com/luciozhang/jsdoc2vitepress-template.git';
    const docsDir = path.resolve(process.cwd(), 'docs');
    await gitclone(templateGitUrl, docsDir, { checkout: 'master', shallow: true });
    fs.removeSync(path.join(docsDir, '.git'));
    loading.succeed('Init docs directory success');
  } catch (error) {
    loading.fail(`Init docs directory fail: ${error}\nPlease delete local 'docs' directory and retry.`);
  }
};
