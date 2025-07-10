export function convertToTitleCase (text) {

  let processedText = text.replace(/([A-Z])/gm, x => ' ' + x.toUpperCase())
  processedText = processedText.replace(/([-][a-z])/i, x => ' ' + x[1].toUpperCase())

  const convertedText = processedText[0].toUpperCase() + processedText.slice(1)

  return convertedText
}