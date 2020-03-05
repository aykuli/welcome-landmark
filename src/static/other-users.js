const otherUsersCoors = (lat, long) => {
  return [
    // 1
    {
      latitude: lat + 5,
      longitude: long,
    },
    // 2
    {
      latitude: lat - 5,
      longitude: long,
    },
    // 3
    {
      latitude: lat + 5,
      longitude: long,
    },
    // 4
    {
      latitude: lat + 5,
      longitude: long - 5,
    },
    // 5
    {
      latitude: lat + 25,
      longitude: long - 25,
    },
    // 6
    {
      latitude: lat + 25,
      longitude: long - 24,
    },
    // 7
    {
      latitude: lat - 45,
      longitude: long,
    },
    // 8
    {
      latitude: lat - 44.9,
      longitude: long,
    },
    // 9
    {
      latitude: lat + 105,
      longitude: long + 105,
    },
    // 10
    {
      latitude: lat + 106,
      longitude: long + 106,
    },
  ];
};

export default otherUsersCoors;
