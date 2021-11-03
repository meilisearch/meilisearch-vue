const { MeiliSearch } = require('meilisearch')
const dataset = require('./prizes.json')

;(async () => {
    // Create client
    const client = new MeiliSearch({
        host: 'http://127.0.0.1:7700',
        apiKey: 'masterKey'
    })

    // Create Index if it does not already exist
    console.log("before")
    const index = await client.getOrCreateIndex('prizes')
    console.log("after")
    console.log('Index "prizes" created.');

    // Add settings
    const settings = {
        distinctAttribute: null,
        searchableAttributes: ["*"],
        displayedAttributes: ["*"],
        stopWords: ["a", "an", "the"],
        synonyms: { },
        filterableAttributes: [
          "year",
          "category"
        ]
      }
    let { updateId: settingsUpdate} = await index.updateSettings(settings)
    await index.waitForPendingUpdate(settingsUpdate, {
      timeOutMs: 100000
    })

    console.log('Settings added to "prizes" index.');

    // Add documents
    let { updateId } = await index.addDocuments(dataset)
    await index.waitForPendingUpdate(updateId, {
        timeOutMs: 100000
    })
    console.log('Documents added to "prizes" index.');

})()
