const {
  override,
  overrideDevServer,
  addDecoratorsLegacy,
  useEslintRc,
  watchAll
} = require('customize-cra')

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    useEslintRc()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
}
