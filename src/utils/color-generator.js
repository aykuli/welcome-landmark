const colorGenerator = (users, color) => {
  const generating = () => {
    const colorNumb = color.slice(1);
    const colorNumb2 = Number.parseInt(colorNumb, 16);
    let colorRes;
    while (colorRes === 0 || colorRes === undefined) {
      colorRes = colorNumb2 * Math.floor((Math.random() + 0.01) * 4);
    }
    const colorRes2 = colorRes.toString(16);
    return `#${colorRes2}`;
  };
  return Array.from(users, generating);
};

export default colorGenerator;
