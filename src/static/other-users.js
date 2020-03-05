const otherUsersCoors = (lat, long) => {
  return [
    // 1
    {
      id: 1,
      latitude: (lat + 0.01) % 90,
      longitude: long % 180,
      info: '1',
    },
    // 2
    {
      id: 2,
      latitude: (lat - 0.01) % 90,
      longitude: long % 180,
      info: '2',
    },
    // 3
    {
      id: 3,
      latitude: (lat + 0.011) % 90,
      longitude: long % 180,
      info: '3',
    },
    // 4
    {
      id: 4,
      latitude: (lat + 0.012) % 90,
      longitude: long % 180,
      info: '4',
    },
    // 5
    {
      id: 5,
      latitude: (lat + 0.05) % 90,
      longitude: (long - 0.05) % 180,
      info: '5',
    },
    // 6
    {
      id: 6,
      latitude: (lat + 0.06) % 90,
      longitude: (long - 0.05) % 180,
      info: '6',
    },
    // 7
    {
      id: 7,
      latitude: (lat - 0.07) % 90,
      longitude: long % 180,
      info: '7',
    },
    // 8
    {
      id: 8,
      latitude: (lat - 0.071) % 90,
      longitude: long % 180,
      info: '8',
    },
    // 9
    {
      id: 9,
      latitude: (lat + 0.07) % 90,
      longitude: (long + 0.01) % 180,
      info: '9',
    },
    // 10
    {
      id: 10,
      latitude: (lat + 0.07) % 90,
      longitude: (long + 0.011) % 180,
      info: '10',
    },
  ];
};

export default otherUsersCoors;
