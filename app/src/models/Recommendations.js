
import Model from '@models/Model'; 

class Recommendations extends Model
{ 
  path = 'recommendations'

  async all() {
    return [
      { id: 1, title: 'Some', description: 'Event more', link: 'than'},
      { id: 2, title: 'Some', description: 'Event more', link: 'than'},
      { id: 3, title: 'Some', description: 'Event more', link: 'than'},
      { id: 4, title: 'Some', description: 'Event more', link: 'than'},
      { id: 5, title: 'Some', description: 'Event more', link: 'than'},
      { id: 6, title: 'Some', description: 'Event more', link: 'than'},
      { id: 7, title: 'Some', description: 'Event more', link: 'than'},
    ]
  }

  async edit(data) {
    return { id: Math.random() * 100000, title: 'Some', description: 'Event more', link: 'than'};
  }

  async delete() {
    
  }
}

export default new Recommendations();