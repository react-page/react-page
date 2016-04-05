module.exports = {
  'Editor has the correct title'(client) {
    client
      .url(client.launch_url)
      .waitForElementVisible('body', 1000)
      .assert.title('Ory.am Editor')
      .end()
  }
}
