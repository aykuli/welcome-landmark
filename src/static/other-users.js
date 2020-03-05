const otherUsersCoors = (lat, long) => {
  return [
    // 1
    {
      id: 1,
      latitude: (lat + 0.01) % 90,
      longitude: long % 180,
    },
    // 2
    {
      id: 2,
      latitude: (lat - 0.01) % 90,
      longitude: long % 180,
    },
    // 3
    {
      id: 3,
      latitude: (lat + 5) % 90,
      longitude: long % 180,
    },
    // 4
    {
      id: 4,
      latitude: (lat + 5) % 90,
      longitude: (long - 5) % 180,
    },
    // 5
    {
      id: 5,
      latitude: (lat + 25) % 90,
      longitude: (long - 25) % 180,
    },
    // 6
    {
      id: 6,
      latitude: (lat + 25) % 90,
      longitude: (long - 24) % 180,
    },
    // 7
    {
      id: 7,
      latitude: (lat - 45) % 90,
      longitude: long % 180,
    },
    // 8
    {
      id: 8,
      latitude: lat - 44.9,
      longitude: long % 180,
    },
    // 9
    {
      id: 9,
      latitude: lat + 105,
      longitude: (long + 105) % 180,
    },
    // 10
    {
      id: 10,
      latitude: lat + 106,
      longitude: (long + 106) % 180,
    },
  ];
};

export default otherUsersCoors;
