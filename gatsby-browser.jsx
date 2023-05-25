exports.onInitialClientRender = () => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  const baseOptimize = document.createElement('script')
  baseOptimize.type = 'text/javascript'
  baseOptimize.async = true
  const timestampAsVersion = Date.now() - Date.now() % 600000
  baseOptimize.src = 'https://cdn4.buysellads.net/pub/dmitripavlutin.js?' + timestampAsVersion
  document.head.appendChild(baseOptimize)

  var optimizeFixedFooterCheck = setInterval(function() {
    if (document.querySelector('.bsa_fixed-leaderboard')) {
      clearInterval(optimizeFixedFooterCheck)
      window.optimize = window.optimize || { queue: [] }
      window.optimize.queue.push(function() {
        window.optimize.push('bsa-zone_1684483359071-0_123456')
      })
    }
  }, 300) // check every 300ms
}