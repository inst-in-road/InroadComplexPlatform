/*
 * @Author: zjd
 * @Date: 2023-02-13 16:18:56
 * @LastEditors: zjd
 * @LastEditTime: 2023-02-13 16:19:08
 * @Description:
 */
module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
	'package.json': ['prettier --write'],
	'*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
	'*.{scss,less,styl,html}': ['stylelint --fix', 'prettier --write'],
	'*.md': ['prettier --write']
}
