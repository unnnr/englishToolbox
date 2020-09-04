export function getLabel(input, label, prefix = false)
{
    if (!!!input.files.length)
        return prefix ? prefix + ' ' + label : label;

    let fileName = input.files[0].name;

    return fileName;
}


export function appendTagsData(data, tags, nullable = false)
{
    console.log(123 ,tags); 
    for (const [index, tag] of tags.entries())
        data.append(`tags[${index}]`, tag.id);
}

export function appendMainTagData(data, mainTag, nullable = false)
{ 
    if (mainTag) data.append('mainTag', mainTag.id);
    else if(nullable) data.append('mainTag', '');
}