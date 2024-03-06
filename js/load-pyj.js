const compiler = RapydScript.create_embedded_compiler();
window.onload = async () => {
  for (script of document.querySelectorAll("script[type='pyj']")) {
    let code
    if (src = script.src) {
      code = await fetch(src).then((x) => x.text())
    } else {
      code = script.textContent
    }
    try {
      eval(`(async () => {${compiler.compile(code)}})()`)
    } catch (err) {
      console.error(`${src}, ${err.line}, ${err.col}:\n${err.message}`)
      document.body.innerHTML = `<code style="text-color:red"><pre>${src}, ${err.line}, ${err.col}:\n${err.message}</pre></code>`
    }
  };
}