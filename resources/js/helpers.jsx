export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const structOptions = (arr) => {
          return arr.map(option => {
                    return {
                              label: option,
                              value: option,
                    }
          })
}
