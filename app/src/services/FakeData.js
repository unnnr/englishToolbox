import Faker from 'faker/locale/ja'
import FormatedDate from '@services/FormatedDate'

class FakeData {
    generateImage() 
    {
        return Faker.image.image();
    };
    
    generateTitle() 
    {
        return Faker.lorem.sentence();
    }
    
    generateDescription() 
    {
        return Faker.lorem.paragraph();
    }
    
    generateViews() 
    {
        return Faker.random.number(3333);
    }
    
    generateDate() 
    {
        return FormatedDate.parse(Faker.date.past());
    }
    
    generateColor() 
    {
        return '#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0');
    }
    
    generateTags() 
    {
        let tags = [];
        let tagsCount = Math.floor(Math.random() * 5);
        
        for (let i = 0; i < tagsCount; i++)
        {
          tags.push({
            color: this.generateColor(),
            label: Faker.lorem.word()
          })
        }
    
        return tags;
    }
    
    generateMainTag() 
    {
        return {
          color: this.generateColor(),
          label: Faker.lorem.word(),
        }
    }

    createComments()
    {
        let comments = [];
        let count = Faker.random.number(15);
    
        for (let i = 0; i < 20 + count; i++)
        {
          comments.push({ 
            message: Faker.lorem.sentence(),
    
            createdAt: FormatedDate.parse(Faker.date.past()),
    
            user: {
              name: Faker.name.firstName(), 
              avatar: Faker.image.avatar()
            }
          })
        }
    
        return comments;
    }
    
    generateVideoId() 
    {
        let videos = [ 
          'eZe4Q_58UTU','BOa0zQBRs_M','Et7O5-CzJZg',
          'ynLpZGegiJE','JB0A8Me8EKk','Vg1mpD1BICI',
          'uMnGzVPUEB4','ww-LFK1-GRg','3raVUTPAd-w',
          '2uQ58Xwx1V4','2f8Q70JZM9w','Mckcmh-OU5M',
          'YF3pj_3mdMc','gaGrHUekGrc','dcEiFOLXy0c',
          'fh3EdeGNKus','QpepXSfYEBk','yKvu63qXSp8',
          'adQPQwXG6AM','KLLVXw335u4'];
    
        let index = Math.floor(Math.random() * videos.length);
        
        return videos[index]; 
    }
    
    createPost(videoId) 
    {
        let youtubeID;

        if (videoId)
            youtubeID = videoId;
        else
            youtubeID = this.generateVideoId();

        let post  = {
          id: Faker.random.number(1000),
    
          title: this.generateTitle(),
    
          description: this.generateDescription(),
    
          views: this.generateViews(),
          
          createdAt: this.generateDate(),
    
          tags: this.generateTags(),
    
          mainTag: this.generateMainTag(),
    
          comments: this.createComments(),
    
          videoId: youtubeID
        };
    
        post.thumbnail = `https://img.youtube.com/vi/${post.videoId}/sddefault.jpg`;
    
        return post;
    }

    generatePosts() 
    {
        let posts = [];
        let count =  1 + Faker.random.number(10);
    
        for (let i = 0; i < count; i++)
          posts.push(this.createPost());
    
        return posts;
    }
}

export default new FakeData();
