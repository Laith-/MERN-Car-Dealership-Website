const optionhighlights = (optionList) => {
    const keys = Object.entries(optionList) // Get all the keys from the optionhighlights object
    console.log(keys)
    const randomKey = keys[Math.floor(Math.random() * keys.length)] // Select a random key

    const result = {}
    result[randomKey] = optionList[randomKey] // Create a new JSON object with the random key and its corresponding value
    return result
}

module.exports = {
    optionhighlights
}