const fs = require('fs');
const path = require('path');

// 순회할 폴더 경로 설정
const baseDir = path.join(__dirname, 'assets');

// 지원하는 이미지 확장자
const supportedExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'];

// 결과를 저장할 배열
const imports = [];
const exportsFile = [];

// 폴더 순회 함수
function traverseDirectory(dir) {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const fullPath = path.join(dir, file);
		const relativePath = path.relative(baseDir, fullPath);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			// 하위 폴더 순회
			traverseDirectory(fullPath);
		} else if (supportedExtensions.includes(path.extname(file).toLowerCase())) {
			// 이미지 파일인 경우 import 문 생성
			const importPath = `@/assets/${relativePath.replace(/\\/g, '/')}`;
			const importName = `${path.basename(file, path.extname(file)).replace(/[^a-zA-Z0-9]/g, '_')}`;
			imports.push(`import ${importName} from '${importPath}';`);
			exportsFile.push(importName);
		}
	});
}

// 폴더 순회 시작
traverseDirectory(baseDir);

// 결과 출력
const output = [
	...imports,
	'',
	`export {`,
	`  ${exportsFile.join(',\n  ')}`,
	`};`
].join('\n');

console.log(output);

// 결과를 파일로 저장 (optional)
fs.writeFileSync('imageExports.ts', output);
