(() => {
  const program = document.querySelector('#program');
  const card = document.querySelector('#card');
  const output = document.querySelector('#output');
  const example = 'PRINT HELLO, WORLD!\nADD 2 3\nREPEAT 2 BEEP';

  function preview() {
    const line = program.value.split('\n')[0] || ' '; 
    card.replaceChildren();
    [...line.slice(0, 40)].forEach((char, index) => {
      const column = document.createElement('i');
      column.className = 'column';
      const code = char.charCodeAt(0);
      for (let bit = 0; bit < 8; bit += 1) {
        const hole = document.createElement('b');
        hole.className = (code >> bit) & 1 ? 'hole' : '';
        hole.title = `column ${index + 1}, row ${bit + 1}`;
        column.append(hole);
      }
      card.append(column);
    });
  }

  function run() {
    const results = [];
    const lines = program.value.replace(/\r/g, '').split('\n');
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index].trim();
      if (!line) continue;
      let match;
      if ((match = /^PRINT\s+(.+)$/i.exec(line))) results.push(match[1]);
      else if ((match = /^ADD\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/i.exec(line))) results.push(String(Number(match[1]) + Number(match[2])));
      else if (/^BEEP$/i.test(line)) results.push('BEEP');
      else if ((match = /^REPEAT\s+(\d+)\s+BEEP$/i.exec(line))) {
        const count = Number(match[1]);
        if (count > 20) return jam(index + 1, 'repeat count must be 20 or less');
        results.push(...Array(count).fill('BEEP'));
      } else return jam(index + 1, `cannot read “${line}”`);
    }
    output.className = 'ok';
    output.textContent = results.length ? `OUTPUT\n${results.join('\n')}\n\nDECK COMPLETE.` : 'DECK COMPLETE. No output cards.';
  }
  function jam(number, message) {
    output.className = 'error';
    output.textContent = `CARD ${number} JAM: ${message}.\n\nUse PRINT, ADD, BEEP, or REPEAT count BEEP.`;
  }
  document.querySelectorAll('[data-insert]').forEach(button => button.addEventListener('click', () => {
    const start = program.selectionStart;
    const end = program.selectionEnd;
    const text = button.dataset.insert;
    program.setRangeText(text, start, end, 'end');
    program.focus(); preview();
  }));
  document.querySelector('#new-card').addEventListener('click', () => { program.setRangeText('\n', program.selectionStart, program.selectionEnd, 'end'); program.focus(); preview(); });
  document.querySelector('#load-example').addEventListener('click', () => { program.value = example; preview(); program.focus(); });
  document.querySelector('#run').addEventListener('click', run);
  program.addEventListener('input', preview);
  program.addEventListener('keydown', event => { if (event.ctrlKey && event.key === 'Enter') { event.preventDefault(); run(); } });
  preview();
})();
