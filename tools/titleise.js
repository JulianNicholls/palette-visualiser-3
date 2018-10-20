const fs = require('fs');

const dontTitleise = ['and', 'the', 'of', 'a', 'with'];

const titleise = word => word[0].toUpperCase() + word.slice(1);
const titleCaseText = text => {
  return text
    .split(/[ /]/)
    .map(word => (dontTitleise.includes(word) ? word : titleise(word)))
    .join(' ');
};

fs.readFile(__dirname + '/../src/XKCDColours.js', (err, data) => {
  if (err) throw err;

  const lines = data.toString().split('\n');

  let errors = [];

  lines.forEach((line, idx) => {
    const parts = line.match(
      /name:\s+['"]([a-z /]+)['"],\s+value:\s+'(#[0-9a-z]{6})'/i
    );

    if (parts === null) {
      errors.push({ line: idx + 1, text: line });
    } else
      console.log(
        `  { name: '${titleCaseText(
          parts[1]
        )}', value: '${parts[2].toUpperCase()}' },`
      );
  });

  console.error(errors);
});
