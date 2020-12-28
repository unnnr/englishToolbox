import Config from '@services/matcher/Config'

class MatcherCollisions {
  entityToBoundary(entity) {
    return {
      top: entity.position.y,
      left: entity.position.x,
      right: entity.position.x + entity.size.width,
      bottom: entity.position.y + entity.size.height
    }
  }
    
  canGroup(firstEntity, secondEntity) {
    let firstCenter = {
      x: firstEntity.position.x + firstEntity.size.width / 2,
      y: firstEntity.position.y + firstEntity.size.height / 2
    }

    let secondCenter = {
      x: secondEntity.position.x + secondEntity.size.width / 2,
      y: secondEntity.position.y + secondEntity.size.height / 2
    }

    let distance = Math.sqrt(Math.pow(firstCenter.x - secondCenter.x, 2) 
      + Math.pow(firstCenter.y - secondCenter.y, 2));
      
    // Computing group radius
    let groupRadius = Config.brick.groupRadius;
    let max = Math.max(firstEntity.size.width, secondEntity.size.width);
    if (max >= groupRadius)
      groupRadius = max + 20;
    
    return distance <= groupRadius;
  }

  collide(first, second) {
    if (first.left >= second.left              // ╔════════════╗
      && first.left <= second.right            //      s ┌────────────┐
      && first.top >= second.top               //              f
      && first.top <= second.bottom)           // ╚════════════╝
      return true;                             //        └────────────┘

    if (first.left >= second.left              //        ┌────────────┐
      && first.left <= second.right            // ╔════════════╗
      && first.bottom >= second.top            //             f
      && first.bottom <= second.bottom)        //      s └────────────┘
      return true;                             // ╚════════════╝

    
    if (first.right >= second.left             //        ╔════════════╗
      && first.right <= second.right           // ┌────────────┐
      && first.top >= second.top               //              s
      && first.top <= second.bottom)           //      f ╚════════════╝
      return true;                             // └────────────┘

    if (first.right >= second.left             // ┌────────────┐
      && first.right <= second.right           //      f ╔════════════╗
      && first.bottom >= second.top            //              s
      && first.bottom <= second.bottom)        // └────────────┘
      return true;                             //        ╚════════════╝

    return false;
  }

  collideEntity(firstEntity, secondEntity) {
    return this.collide(
      this.entityToBoundary(firstEntity),
      this.entityToBoundary(secondEntity))
  }

  collideWorld() {
    
  }
}

export default new MatcherCollisions(); 