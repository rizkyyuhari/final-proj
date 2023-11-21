const portfolios = [
  {
    ticker: {
      name: 'Bitcoin',
      ticker: 'BTC',
      description:
        'Bitcoin is a decentralized digital currency. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. The cryptocurrency was invented in 2008 by an unknown entity under the name Satoshi Nakamoto.',
      id: '65460cc7e174e81823ac62f5'
    },
    amount: 1,
    customer: '65460cc7e174e81823ac62f4',
    id: '65460cc7e174e81823ac62f7',
    date: '2023-11-04T09:14:10.944Z'
  },
  {
    ticker: {
      name: 'Etherium',
      ticker: 'ETH',
      description: 'ETH is just a coin ',
      id: '65460cc7e174e81823ac62sd'
    },
    amount: 1,
    customer: '65460cc7e174e81823ac62f4',
    id: '65460cc7e174e81823ac62f3',
    date: '2023-11-04T09:14:10.944Z'
  }
];

const portfolioServiceResult = [
  {
    date: '2023-11-04T09:14:10.944Z',
    tickers: [
      {
        ticker: 'BTC',
        id: '65460cc7e174e81823ac62f5',
        amount: 1
      },
      {
        ticker: 'ETH',
        id: '65460cc7e174e81823ac62sd',
        amount: 1
      }
    ]
  }
];

const transformedData = {
  portfolios: [
    {
      date: '2023-11-04T09:14:10.944Z',
      tickers: [
        {
          ticker: 'BTC',
          id: '65460cc7e174e81823ac62f5',
          amount: 1
        },
        {
          ticker: 'ETH',
          id: '65460cc7e174e81823ac62sd',
          amount: 1
        }
      ]
    }
  ]
};

export { portfolios, transformedData, portfolioServiceResult };
