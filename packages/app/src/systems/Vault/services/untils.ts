export function shuffle(array: Array<T>): Array<T> {
  let currentIndex = array.length;

  const newArray = [...array]; // Create a copy of the array to avoid modifying the original

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap the elements in the new array
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}
