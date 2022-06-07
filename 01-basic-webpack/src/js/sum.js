function sum(...args) {
  return args.reduce((pre, item) => {
    return pre + item
  }, 0)
}

export default sum
