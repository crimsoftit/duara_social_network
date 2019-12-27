const SocialNetwork = artifacts.require('./SocialNetwork.sol')

require ('chai')
	.use(require('chai-as-promised'))
	.should()

contract ('SocialNetwork', ([deployer, author, tipper]) => {
	let socialNetwork

	before (async () => {
		socialNetwork = await SocialNetwork.deployed()
	})

	describe ('deployment', async () => {
		it ('deploys successfully', async () => {
			const address = await socialNetwork.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it ('has a name', async () => {
			const name = await socialNetwork.name()
			assert.equal(name, "Duara Social Site")
		})
	})

	describe ('posts', async () => {
		let result, postCount

		before (async () => {
			result = await socialNetwork.createPost('my 1st post', { from: author })
			postCount = await socialNetwork.postCount()
		})

		it ('creates posts', async () => {

			// success
			assert.equal(postCount, 1)
			const event = result.logs[0].args
			assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correctly set')
			assert.equal(event.content, 'my 1st post', 'content is correctly set')
			assert.equal(event.tipAmount.toNumber(), 0, 'tipAmount is correctly set')
			assert.equal(event.author, author, 'content author is correctly set')
			console.log(event)

			// failure: post must have content
			await socialNetwork.createPost('', { from: author }).should.be.rejected
		})

		it ('lists posts', async () => {
			const post = await socialNetwork.posts(postCount)
			assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is set correctly')
			assert.equal(post.content, 'my 1st post', 'content is set correctly')
			assert.equal(post.tipAmount.toNumber(), 0, 'tipAmount is set correctly')
			assert.equal(post.author, author, 'content author is set correctly')
		})
	})
})