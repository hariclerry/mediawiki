const getTestString = ( prefix = '' ) => {
	return prefix + Math.random().toString() + '-Iñtërnâtiônàlizætiøn';
};

module.exports = {
	getTestString
};
