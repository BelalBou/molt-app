import './style.css'

const host = window.location.hostname
const API_BASE = window.location.protocol + '//' + host + ':3000'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = [
  '<div class=page>',
  '  <header>',
  '    <h1>Molt — Panel</h1>',
  '    <p class=muted>Live status + changelog</p>',
  '  </header>',
  '  <section class=card>',
  '    <h2>Status</h2>',
  '    <div id=status class=status>Loading...</div>',
  '  </section>',
  '  <section class=card>',
  '    <h2>Changelog</h2>',
  '    <pre id=changelog>Loading...</pre>',
  '  </section>',
  '</div>',
].join('\n')

const statusEl = document.querySelector<HTMLDivElement>('#status')!
const changelogEl = document.querySelector<HTMLPreElement>('#changelog')!

async function refresh() {
  try {
    const res = await fetch(API_BASE + '/status')
    const data = await res.json()
    statusEl.textContent = 'Last update: ' + data.updatedAt
    changelogEl.textContent = data.content
  } catch (e) {
    statusEl.textContent = 'Status unavailable'
    changelogEl.textContent = 'Changelog unavailable'
  }
}

refresh()
setInterval(refresh, 5000)
