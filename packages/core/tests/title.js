module.exports = {
  'Editor has the correct title'(client) {
    client
      .url(client.launch_url)
      .waitForElementVisible('body', 3000)
      .assert.title('Ory.am Editor')
      .assert.containsText('body', 'SOUTH BENFLEET')
      .end()
  }
}
