describe('Example', () => {
	beforeEach(async () => {
		await device.reloadReactNative()
	})

	it('should have weather component', async () => {
		await expect(element(by.id('weatherComponent'))).toBeVisible()
	})
})
