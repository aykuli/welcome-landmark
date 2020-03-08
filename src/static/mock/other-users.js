const otherUsersCoors = (lat, long) => {
  return [
    // 1
    {
      id: 1,
      latitude: (lat + 0.01) % 90,
      longitude: long % 180,
      info: {
        country: 'country1',
        city: 'city1',
      },
    },
    // 2
    {
      id: 2,
      latitude: (lat - 0.01) % 90,
      longitude: long % 180,
      info: {
        country: 'country2',
        city: 'city2',
      },
    },
    // 3
    {
      id: 3,
      latitude: (lat + 0.011) % 90,
      longitude: long % 180,
      info: {
        country: 'country3',
        city: 'city3',
      },
    },
    // 4
    {
      id: 4,
      latitude: (lat + 0.012) % 90,
      longitude: long % 180,
      info: {
        country: 'country4',
        city: 'city4',
      },
    },
    // 5
    {
      id: 5,
      latitude: (lat + 0.05) % 90,
      longitude: (long - 0.05) % 180,
      info: {
        country: 'countr51',
        city: 'city5',
      },
    },
    // 6
    {
      id: 6,
      latitude: (lat + 0.06) % 90,
      longitude: (long - 0.05) % 180,
      info: {
        country: 'country6',
        city: 'city6',
      },
    },
    // 7
    {
      id: 7,
      latitude: (lat - 0.07) % 90,
      longitude: long % 180,
      info: {
        country: 'country7',
        city: 'city7',
      },
    },
    // 8
    {
      id: 8,
      latitude: (lat - 0.071) % 90,
      longitude: long % 180,
      info: {
        country: 'country8',
        city: 'city8',
      },
    },
    // 9
    {
      id: 9,
      latitude: (lat + 0.07) % 90,
      longitude: (long + 0.01) % 180,
      info: {
        country: 'country9',
        city: 'city9',
      },
    },
    // 10
    {
      id: 10,
      latitude: (lat + 0.07) % 90,
      longitude: (long + 0.011) % 180,
      info: {
        country: 'country10',
        city: 'city10',
      },
    },
  ];
};

export default otherUsersCoors;
