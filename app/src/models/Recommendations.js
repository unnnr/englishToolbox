
import Model from '@models/Model'; 

class Recommendations extends Model
{ 
  path = 'recommendations'

  async all() {
    let image = 'https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2019/09/async-components-on-Vue.png?w=730&ssl=1';
    return [
      { id: 1, image, title: 'Some1', description: 'Even more', link: 'than'},
      { id: 2, image, title: 'Some2', description: 'Even more', link: 'than'},
      { id: 7, image, title: 'Some3', description: 'Even more', link: 'than'},
    ]
  }

  async create() {
    return { id: Math.random() * 100000, title: 'Some' +  Math.random() * 100000, description: 'Even more', link: 'than'};
  }

  async edit(data) {
    return { id: Math.random() * 100000, title: 'Some', description: 'Even more', link: 'than'};
  }

  async delete() {
    
  }
}

export default new Recommendations();