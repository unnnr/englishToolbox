export function appendTagsData(data, tags)
{
    for (const [index, tag] of tags.entries())
        data.append(`tags[${index}]`, tag.id);
}

export function appendMainTagData(data,mainTag, nullable = false)
{ 
    if (mainTag) data.append('mainTag', mainTag.id);
    else if(nullable) data.append('mainTag', '');
}