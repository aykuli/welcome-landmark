const colorGenerator = (users, color) => {
  console.log(users.length);
  const generating = () => {
    const colorNumb = color.slice(1);
    const colorNumb2 = Number.parseInt(colorNumb, 16);
    const colorRes = colorNumb2 * Math.floor((Math.random() + 0.1) * 5);
    const colorRes2 = colorRes.toString(16);
    return `#${colorRes2}`;
  };
  return Array.from(users, generating);
};

export default colorGenerator;
