const FormatedDate = new function() {
    
    this.parse = (timestamp) => 
    {

        const date = new Date(timestamp);
        
        let dateString = new Intl
                            .DateTimeFormat(...formatOptions)
                            .format(date)
                            .replace(',', '');

        return dateString;
    }

    const formatOptions = [
        'en-US',
        {
            day:'numeric',
            year: 'numeric',
            month: 'short'
        }
    ];
}();

export default FormatedDate;