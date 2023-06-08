const optionhighlights = (optionList) => {
    /// this is where we will choose the options that get highlighted
    /// right now it is just spitting out a random option from the json it is given
    /// might be a bad idea to be doing this during the api call idk

    const keys = Object.keys(optionList) 
    const randomKey = keys[Math.floor(Math.random() * keys.length)] 
    const randomValue = optionList[randomKey] 

    const result = {
      [randomKey]: randomValue 
    }

    return result
}

module.exports = {
    optionhighlights
}