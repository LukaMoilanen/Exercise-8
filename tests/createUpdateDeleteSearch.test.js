import test from 'node:test'
import assert from 'node:assert'
import {server} from '../apidefs.js'

test('create, update, search and delete data flows', async () => {
    await server.start()

    // 1) create
    const createQuery = `mutation { createData(forename: "Testy", surname: "McTest") { id forename surname } }`
    const createResp = await server.executeOperation({query: createQuery}, {contextValue: { user: 'pl' }})
    const created = createResp.body.singleResult.data.createData
    assert.ok(created)
    assert.strictEqual(created.forename, 'Testy')

    // 2) search
    const searchQ = `query { searchData(forename: "Test") { id forename surname } }`
    const searchResp = await server.executeOperation({query: searchQ}, {contextValue: { user: 'pl' }})
    const found = searchResp.body.singleResult.data.searchData
    assert.ok(Array.isArray(found))
    assert.ok(found.some(d => d.forename === 'Testy'))

    // 3) update
    const id = created.id
    const updQ = `mutation { updateData(id: ${id}, forename: "Updated", surname: "Person") { id forename surname } }`
    const updResp = await server.executeOperation({query: updQ}, {contextValue: { user: 'pl' }})
    const updated = updResp.body.singleResult.data.updateData
    assert.strictEqual(updated.forename, 'Updated')

    // 4) delete
    const delQ = `mutation { deleteData(id: ${id}) }`
    const delResp = await server.executeOperation({query: delQ}, {contextValue: { user: 'pl' }})
    const ok = delResp.body.singleResult.data.deleteData
    assert.strictEqual(ok, true)

    await server.stop()
})
