let fs = require('fs');
let path = require('path');

file_buffer = fs.readFileSync('./index_tpl.html');

file_str = file_buffer.toString();

dirnames = fs.readdirSync('./')
	.filter(file => fs.lstatSync(path.join('./', file)).isDirectory() && file != '.git')
	.map(dir_name => newTpl(dir_name));

function newTpl(dir_name) {
	let tpl = `
		<ol>
			<a href="./${dir_name}/">${dir_name}</a>
		</ol>`;
	return tpl;
}


new_file = file_str.replace(/(<ul>)(?:.*[\r\n\t]*){1,}(<\/ul>)/gi, '$1' + dirnames.join('') + '$2');

fs.writeFileSync('./index.html', new_file);

console.log('updated OK!');