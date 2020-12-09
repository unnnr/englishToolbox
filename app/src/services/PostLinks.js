class PostLinks {
  map = {
    'audio': 'audio',
    'video': 'videos',
    'chart': 'charts',
  }

  generate(type, id) {
    let parsedType = this.map[type];
    if (!!!parsedType)
      null

    return parsedType + '/' + id
  }
}

export default new PostLinks();