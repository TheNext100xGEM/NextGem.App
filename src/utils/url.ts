const removeUrlPrefix = (url: string): string => url.replace(/^https?:\/\//, '')

export { removeUrlPrefix }