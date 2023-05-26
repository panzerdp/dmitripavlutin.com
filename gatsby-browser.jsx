exports.onInitialClientRender = () => {
  return
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  const baseOptimize = document.createElement('script')
  baseOptimize.type = 'text/javascript'
  baseOptimize.async = true
  const timestampAsVersion = Date.now() - Date.now() % 600000
  baseOptimize.src = 'https://cdn4.buysellads.net/pub/dmitripavlutin.js?' + timestampAsVersion
  document.head.appendChild(baseOptimize)
}