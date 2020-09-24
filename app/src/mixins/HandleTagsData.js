const HandleTagsData = {

    methods: {
        appendTagsData(data, tags, nullable = false)
        {
            for (const [index, tag] of tags.entries())
                data.append(`tags[${index}]`, tag.id);
        },

        appendMainTagData(data, mainTag, nullable = false)
        { 
            if (mainTag) data.append('mainTag', mainTag.id);
            else if(nullable) data.append('mainTag', '');
        }
    }   
}   

export default HandleTagsData;