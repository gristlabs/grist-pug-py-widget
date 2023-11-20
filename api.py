grist, monaco, pug, sessionStorage, JSON = window.grist, window.monaco, window.pug, window.sessionStorage, window.JSON
urlParams = __new__(window.URLSearchParams(window.location.search))
widget_id = urlParams.js_get("id") or window.crypto.randomUUID()

__pragma__ ('jsiter')
models = {}
widget = {"installed": False, "isEditor": False}
__pragma__ ('nojsiter')

_memory = {}
def memory(name):
  key = f"__{widget_id}_{name}"
  try:
    if _memory[key]:
      return _memory[key]
  except KeyError:
    pass
  def fn(arg=None):
    if arg is None:
      value = sessionStorage.getItem(key)
      return JSON.parse(value) if value else value
    else:
      sessionStorage.setItem(key, JSON.stringify(arg))
  _memory[key] = fn
  return fn

def changeModel(el):
  widget.editor.setModel(models[el.id])
  for tab in document.querySelectorAll("._tab"):
    tab.style.background = 'transparent'
  el.style.background = 'lightgreen'

def buildEditor():
  for tab in document.querySelectorAll("._tab"):
    _id, _type, _content = tab.id, tab.dataset.js_type, tab.children[1].innerHTML.replace("&lt;", "<")
    model = monaco.editor.createModel(memory(_id)() or _content, _type)
    model.onDidChangeContent(lambda *args: memory(_id)(model.getValue()))
    model._type = _type
    models[_id] = model
    tab.addEventListener("click", lambda e, *args: changeModel(e.target))
  # Create PY monaco model - like a tab in the IDE.
  # Create IDE. Options here are only for styling and making editor look like a
  # code snippet.
  editor = monaco.editor.create(document.getElementById('container'), {
    "model": models.pug,
    "automaticLayout": True,
    "fontSize": '13px',
    "wordWrap": 'on',
    "minimap": {"enabled": False,},
    "lineNumbers": 'on',
    "glyphMargin": False,
    "folding": False,
  })
  # Set tabSize - this can be done only after editor is created.
  editor.getModel().updateOptions({"tabSize": 2})
  # Disable scrolling past the last line - we will expand editor if necessary.
  editor.updateOptions({"scrollBeyondLastLine": False})
  widget.editor = editor

def purge(el):
  while el.firstChild:
    el.removeChild(el.firstChild)

def showPreview():
  __pragma__('jsiter')
  for k in models:
    model = models[k]
    code = model.getValue()
    if model._type == "pug":
      fnPug = pug.compile(code)
      lastListener = None
      def render_pug(*data):
        nonlocal lastListener
        page_widget = document.getElementById('page_widget')
        wFrame = document.createElement('iframe')
        purge(page_widget)
        page_widget.appendChild(wFrame)
        widgetWindow = wFrame.contentWindow
        # Rewire messages between this widget, and the preview
        if lastListener:
          window.removeEventListener('message', lastListener)
        def lastListener(e):
          if e.source == widgetWindow:
            window.parent.postMessage(e.data, '*')
          elif e.source == window.parent:
            widgetWindow.postMessage(e.data, '*')
        window.addEventListener('message', lastListener)
        content = wFrame.contentWindow
        content.document.open()
        content.document.write(fnPug(*data))
        content.document.close()
      window.render_pug = render_pug
    elif model._type == "python":
      pyscript = document.createElement("script")
      pyscript.js_type = "text/python"
      pyscript.innerHTML = code
      document.head.appendChild(pyscript)
    elif model._type == "javascript":
      jsscript = document.createElement("script")
      jsscript.innerHTML = code
      document.head.appendChild(jsscript)
  __pragma__('nojsiter')
  document.getElementById('page_editor').style.display = 'none'
  document.getElementById('page_widget').style.display = 'block'
  for selector in ('._tab', '._btn'):
    for e in document.querySelectorAll(selector):
      e.style.display = 'none'
  document.getElementById('install').style.display = 'inline-block'
  document.getElementById('editor').style.display = 'inline-block'
  memory('preview')(True)

def showEditor():
  document.getElementById('_bar').style.display = 'flex'
  document.getElementById('page_widget').style.display = 'none'
  document.getElementById('page_editor').style.display = 'block'
  memory('preview')(False)
  for e in document.querySelectorAll('._tab'):
    e.style.display = 'inline-block'
  for e in document.querySelectorAll('._button'):
    e.style.display = 'none'
  document.getElementById('preview').style.display = 'inline-block'

# Create cancellable onOptions version
def onOptions(clb):
  listen = True
  def callback(*data):
    if listen:
      clb(*data)
  def cancel():
    listen = False
  grist.onOptions(callback)
  return cancel

def callback(options, *args):
  if widget.installed:
    return
  if options and options._installed:
    installed = True
    document.getElementById('_bar').style.display = 'none'
    for tab in document.querySelectorAll("._tab"):
      memory(tab.id)(options[f"_{tab.id}"])
    buildEditor()
    showPreview()
    document.getElementById('install').style.display = 'none'
    def cb(options, *_):
      if not options:
        memory('preview')(False)
        window.location.reload()
    onOptions(cb)
  elif not widget.isEditor:
    isEditor = True
    buildEditor()
    if memory('preview')():
      showPreview()
    else:
      showEditor()
onOptions(callback)

def install():
  __pragma__ ('jsiter')
  options = {"_installed": True}
  __pragma__ ('jsiter')
  for _id in models:
    options[f"_{_id}"] = models[_id].getValue()
  grist.setOptions(options).then(window.location.reload())

grist.ready({"onEditOptions": showEditor})

document.getElementById("install").onclick = install
document.getElementById("preview").onclick = showPreview
document.getElementById("editor").onclick = showEditor
