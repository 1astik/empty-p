module.exports.asyncHttpWrapper = func => (...args) => Promise.resolve(func(...args)).catch(args[args.length - 1])