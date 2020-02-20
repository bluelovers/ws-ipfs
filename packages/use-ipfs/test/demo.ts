import useIPFS from '../index';

useIPFS({
	disposable: true,
})
	.then(async (value) => {

		console.log(await value.ipfs.id());

		return value.stop();
	})
;
