export function appendTagsData(data, tags, nullable = false)
{
    if(nullable && tags.length === 0)
    {
        data.append('tags', '');
        return;
    }
        
    for (const [index, tag] of tags.entries())
        data.append(`tags[${index}]`, tag.id);
}

export function appendMainTagData(data, mainTag, nullable = false)
{ 
    if (mainTag) data.append('mainTag', mainTag.id);
    else if(nullable) data.append('mainTag', '');
}