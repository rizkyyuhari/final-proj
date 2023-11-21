/* eslint-disable max-lines-per-function */
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');

const today = new Date();
const yesterday = new Date(today);
const lastTwoDays = new Date(today);
const lastThreeDays = new Date(today);
const lastFourDays = new Date(today);
const lastFiveDays = new Date(today);
const lastSixDays = new Date(today);
const tomorrow = new Date(today);
const nextTwoDays = new Date(today);
const nextThreeDays = new Date(today);
const nextFourDays = new Date(today);
const nextFiveDays = new Date(today);
const nextSixDays = new Date(today);
const nextSevenDays = new Date(today);

today.setHours(0, 0, 0, 0);
yesterday.setHours(0, 0, 0, 0);
lastTwoDays.setHours(0, 0, 0, 0);
lastThreeDays.setHours(0, 0, 0, 0);
lastFourDays.setHours(0, 0, 0, 0);
lastFiveDays.setHours(0, 0, 0, 0);
lastSixDays.setHours(0, 0, 0, 0);
tomorrow.setHours(0, 0, 0, 0);
nextTwoDays.setHours(0, 0, 0, 0);
nextThreeDays.setHours(0, 0, 0, 0);
nextFourDays.setHours(0, 0, 0, 0);
nextFiveDays.setHours(0, 0, 0, 0);
nextSixDays.setHours(0, 0, 0, 0);
nextSevenDays.setHours(0, 0, 0, 0);

yesterday.setDate(today.getDate() - 1);
lastTwoDays.setDate(today.getDate() - 2);
lastThreeDays.setDate(today.getDate() - 3);
lastFourDays.setDate(today.getDate() - 4);
lastFiveDays.setDate(today.getDate() - 5);
lastSixDays.setDate(today.getDate() - 6);
tomorrow.setDate(today.getDate() + 1);
nextTwoDays.setDate(today.getDate() + 2);
nextThreeDays.setDate(today.getDate() + 3);
nextFourDays.setDate(today.getDate() + 4);
nextFiveDays.setDate(today.getDate() + 5);
nextSixDays.setDate(today.getDate() + 6);
nextSevenDays.setDate(today.getDate() + 7);

module.exports = {
  async up(db) {
    const hashpassword = await bcrypt.hash('123456', 12);

    // Customer
    const { insertedId: customerId } = await db.collection('customer').insertOne({
      _id: new mongoose.Types.ObjectId('6548e650b1c6cd04394bdf6c'),
      name: 'Aulia',
      username: 'Aulia',
      password: hashpassword,
      createdAt: today,
      updatedAt: today
    });

    // TICKERS
    const { insertedId: tickerIdIDR } = await db.collection('ticker').insertOne({
      _id: new mongoose.Types.ObjectId('654b1142b811bfd8313a274b'),
      name: 'Indonesian Rupiah',
      ticker: 'IDR',
      description: 'Indonesian Rupiah',
      createdAt: today,
      updatedAt: today
    });

    const { insertedId: tickerIdBTC } = await db.collection('ticker').insertOne({
      name: 'Bitcoin',
      ticker: 'BTC',
      description:
        'Bitcoin is a decentralized digital currency. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. The cryptocurrency was invented in 2008 by an unknown entity under the name Satoshi Nakamoto.',
      createdAt: today,
      updatedAt: today
    });

    const { insertedId: tickerIdLTC } = await db.collection('ticker').insertOne({
      name: 'Litecoin',
      ticker: 'LTC',
      description:
        'Litecoin (LTC) is a cryptocurrency created from a fork in the Bitcoin blockchain in 2011. It was initially designed to address the developer concerns that Bitcoin was becoming too centrally controlled, and to make it more difficult for largescale mining firms to gain the upper hand in mining',
      createdAt: today,
      updatedAt: today
    });

    const { insertedId: tickerIdETH } = await db.collection('ticker').insertOne({
      name: 'Ethereum',
      ticker: 'ETH',
      description: 'Ethereum just a coin nothing more',
      createdAt: today,
      updatedAt: today
    });

    const { insertedId: tickerIdXRP } = await db.collection('ticker').insertOne({
      name: 'XRP',
      ticker: 'XRP',
      description:
        'Ripple is a real-time gross settlement system, currency exchange and remittance network that is open to financial institutions worldwide and was created by Ripple Labs Inc., a US-based technology company',
      createdAt: today,
      updatedAt: today
    });

    // Portfolio IDR
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: nextSevenDays,
      updatedAt: nextSevenDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: nextSixDays,
      updatedAt: nextSixDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: nextFiveDays,
      updatedAt: nextFiveDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: nextFourDays,
      updatedAt: nextFourDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: nextThreeDays,
      updatedAt: nextThreeDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: nextTwoDays,
      updatedAt: nextTwoDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdIDR,
      amount: 10000000,
      customer: customerId,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Portfolio BTC
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdBTC,
      amount: 1,
      customer: customerId,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Portfolio ETH
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdETH,
      amount: 1,
      customer: customerId,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Portfolio LTC
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdLTC,
      amount: 1,
      customer: customerId,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Portfolio XRP
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('portfolio').insertOne({
      ticker: tickerIdXRP,
      amount: 1,
      customer: customerId,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Price History BTC
    await db.collection('price-history').insertOne({
      price: 1700000,
      ticker: tickerIdBTC,
      createdAt: nextSevenDays,
      updatedAt: nextSevenDays
    });
    await db.collection('price-history').insertOne({
      price: 1600000,
      ticker: tickerIdBTC,
      createdAt: nextSixDays,
      updatedAt: nextSixDays
    });
    await db.collection('price-history').insertOne({
      price: 1500000,
      ticker: tickerIdBTC,
      createdAt: nextFiveDays,
      updatedAt: nextFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1400000,
      ticker: tickerIdBTC,
      createdAt: nextFourDays,
      updatedAt: nextFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1300000,
      ticker: tickerIdBTC,
      createdAt: nextThreeDays,
      updatedAt: nextThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1200000,
      ticker: tickerIdBTC,
      createdAt: nextTwoDays,
      updatedAt: nextTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1200000,
      ticker: tickerIdBTC,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdBTC,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('price-history').insertOne({
      price: 1280000,
      ticker: tickerIdBTC,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('price-history').insertOne({
      price: 1190000,
      ticker: tickerIdBTC,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1350000,
      ticker: tickerIdBTC,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1050000,
      ticker: tickerIdBTC,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdBTC,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1250000,
      ticker: tickerIdBTC,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Price History ETH
    await db.collection('price-history').insertOne({
      price: 700000,
      ticker: tickerIdETH,
      createdAt: nextSevenDays,
      updatedAt: nextSevenDays
    });
    await db.collection('price-history').insertOne({
      price: 800000,
      ticker: tickerIdETH,
      createdAt: nextSixDays,
      updatedAt: nextSixDays
    });
    await db.collection('price-history').insertOne({
      price: 900000,
      ticker: tickerIdETH,
      createdAt: nextFiveDays,
      updatedAt: nextFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1000000,
      ticker: tickerIdETH,
      createdAt: nextFourDays,
      updatedAt: nextFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1100000,
      ticker: tickerIdETH,
      createdAt: nextThreeDays,
      updatedAt: nextThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1120000,
      ticker: tickerIdETH,
      createdAt: nextTwoDays,
      updatedAt: nextTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1110000,
      ticker: tickerIdETH,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdETH,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('price-history').insertOne({
      price: 1280000,
      ticker: tickerIdETH,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('price-history').insertOne({
      price: 1190000,
      ticker: tickerIdETH,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1350000,
      ticker: tickerIdETH,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1050000,
      ticker: tickerIdETH,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdETH,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1250000,
      ticker: tickerIdETH,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Price History LTC
    await db.collection('price-history').insertOne({
      price: 1200000,
      ticker: tickerIdLTC,
      createdAt: nextSevenDays,
      updatedAt: nextSevenDays
    });
    await db.collection('price-history').insertOne({
      price: 1190000,
      ticker: tickerIdLTC,
      createdAt: nextSixDays,
      updatedAt: nextSixDays
    });
    await db.collection('price-history').insertOne({
      price: 1180000,
      ticker: tickerIdLTC,
      createdAt: nextFiveDays,
      updatedAt: nextFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1170000,
      ticker: tickerIdLTC,
      createdAt: nextFourDays,
      updatedAt: nextFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1160000,
      ticker: tickerIdLTC,
      createdAt: nextThreeDays,
      updatedAt: nextThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1150000,
      ticker: tickerIdLTC,
      createdAt: nextTwoDays,
      updatedAt: nextTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1130000,
      ticker: tickerIdLTC,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdLTC,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('price-history').insertOne({
      price: 1280000,
      ticker: tickerIdLTC,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('price-history').insertOne({
      price: 1190000,
      ticker: tickerIdLTC,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1350000,
      ticker: tickerIdLTC,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1050000,
      ticker: tickerIdLTC,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdLTC,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1250000,
      ticker: tickerIdLTC,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    // Price History XRP
    await db.collection('price-history').insertOne({
      price: 1090000,
      ticker: tickerIdXRP,
      createdAt: nextSevenDays,
      updatedAt: nextSevenDays
    });
    await db.collection('price-history').insertOne({
      price: 1100000,
      ticker: tickerIdXRP,
      createdAt: nextSixDays,
      updatedAt: nextSixDays
    });
    await db.collection('price-history').insertOne({
      price: 1110000,
      ticker: tickerIdXRP,
      createdAt: nextFiveDays,
      updatedAt: nextFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1120000,
      ticker: tickerIdXRP,
      createdAt: nextFourDays,
      updatedAt: nextFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1120000,
      ticker: tickerIdXRP,
      createdAt: nextThreeDays,
      updatedAt: nextThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1130000,
      ticker: tickerIdXRP,
      createdAt: nextTwoDays,
      updatedAt: nextTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1150000,
      ticker: tickerIdXRP,
      createdAt: tomorrow,
      updatedAt: tomorrow
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdXRP,
      createdAt: today,
      updatedAt: today
    });
    await db.collection('price-history').insertOne({
      price: 1280000,
      ticker: tickerIdXRP,
      createdAt: yesterday,
      updatedAt: yesterday
    });
    await db.collection('price-history').insertOne({
      price: 1190000,
      ticker: tickerIdXRP,
      createdAt: lastTwoDays,
      updatedAt: lastTwoDays
    });
    await db.collection('price-history').insertOne({
      price: 1350000,
      ticker: tickerIdXRP,
      createdAt: lastThreeDays,
      updatedAt: lastThreeDays
    });
    await db.collection('price-history').insertOne({
      price: 1050000,
      ticker: tickerIdXRP,
      createdAt: lastFourDays,
      updatedAt: lastFourDays
    });
    await db.collection('price-history').insertOne({
      price: 1140000,
      ticker: tickerIdXRP,
      createdAt: lastFiveDays,
      updatedAt: lastFiveDays
    });
    await db.collection('price-history').insertOne({
      price: 1250000,
      ticker: tickerIdXRP,
      createdAt: lastSixDays,
      updatedAt: lastSixDays
    });

    const transactions = [
      {
        ticker: tickerIdBTC,
        amount: 1,
        category: 'buy',
        totalPrice: 2859129,
        fee: 1429,
        customer: customerId,
        createdAt: new Date('2023-11-01T09:14:10.944Z'),
        updatedAt: new Date('2023-11-01T09:14:10.944Z')
      },
      {
        ticker: tickerIdETH,
        amount: 2,
        category: 'sell',
        totalPrice: 2997000,
        fee: 3000,
        customer: customerId,
        createdAt: new Date('2023-11-01T09:14:10.944Z'),
        updatedAt: new Date('2023-11-01T09:14:10.944Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 1,
        category: 'buy',
        totalPrice: 1500750,
        fee: 750,
        customer: customerId,
        createdAt: new Date('2023-11-02T09:14:10.944Z'),
        updatedAt: new Date('2023-11-02T09:14:10.944Z')
      },
      {
        ticker: tickerIdLTC,
        amount: 0.02,
        category: 'buy',
        totalPrice: 5002500,
        fee: 2500,
        customer: customerId,
        createdAt: new Date('2023-11-02T09:14:10.944Z'),
        updatedAt: new Date('2023-11-02T09:14:10.944Z')
      },
      {
        ticker: tickerIdETH,
        amount: 0.1,
        category: 'sell',
        totalPrice: 2860560,
        fee: 2858,
        customer: customerId,
        createdAt: new Date('2023-11-03T09:14:10.944Z'),
        updatedAt: new Date('2023-11-03T09:14:10.944Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 1.5,
        category: 'buy',
        totalPrice: 3601801,
        fee: 1800,
        customer: customerId,
        createdAt: new Date('2023-11-03T09:14:10.944Z'),
        updatedAt: new Date('2023-11-03T09:14:10.944Z')
      },
      {
        ticker: tickerIdLTC,
        amount: 1,
        category: 'buy',
        totalPrice: 2859131,
        fee: 1429,
        customer: customerId,
        createdAt: new Date('2023-11-04T09:14:10.944Z'),
        updatedAt: new Date('2023-11-04T09:14:10.944Z')
      },
      {
        ticker: tickerIdETH,
        amount: 1,
        category: 'buy',
        totalPrice: 2358181,
        fee: 1179,
        customer: customerId,
        createdAt: new Date('2023-11-04T09:14:10.944Z'),
        updatedAt: new Date('2023-11-04T09:14:10.944Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 1,
        category: 'buy',
        totalPrice: 2006004,
        fee: 1003,
        customer: customerId,
        createdAt: new Date('2023-11-04T09:14:10.944Z'),
        updatedAt: new Date('2023-11-04T09:14:10.944Z')
      },
      {
        ticker: tickerIdETH,
        amount: 1,
        category: 'buy',
        totalPrice: 2959481,
        fee: 1479,
        customer: customerId,
        createdAt: new Date('2023-11-05T07:43:33.146Z'),
        updatedAt: new Date('2023-11-05T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 0.23,
        category: 'buy',
        totalPrice: 3052538,
        fee: 1526,
        customer: customerId,
        createdAt: new Date('2023-11-07T07:43:33.146Z'),
        updatedAt: new Date('2023-11-07T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 0.15,
        category: 'buy',
        totalPrice: 3092476,
        fee: 1545,
        customer: customerId,
        createdAt: new Date('2023-11-08T07:43:33.146Z'),
        updatedAt: new Date('2023-11-08T07:43:33.146Z')
      },
      {
        ticker: tickerIdETH,
        amount: 1.15,
        category: 'sell',
        totalPrice: 3215905,
        fee: 3219,
        customer: customerId,
        createdAt: new Date('2023-11-10T07:43:33.146Z'),
        updatedAt: new Date('2023-11-10T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 0.43,
        category: 'buy',
        totalPrice: 2392399,
        fee: 1196,
        customer: customerId,
        createdAt: new Date('2023-11-12T07:43:33.146Z'),
        updatedAt: new Date('2023-11-12T07:43:33.146Z')
      },
      {
        ticker: tickerIdETH,
        amount: 0.4,
        category: 'sell',
        totalPrice: 2547774,
        fee: 2550,
        customer: customerId,
        createdAt: new Date('2023-11-13T07:43:33.146Z'),
        updatedAt: new Date('2023-11-13T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 0.4,
        category: 'sell',
        totalPrice: 2217093,
        fee: 2219,
        customer: customerId,
        createdAt: new Date('2023-11-16T07:43:33.146Z'),
        updatedAt: new Date('2023-11-16T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 2,
        category: 'buy',
        totalPrice: 2858549,
        fee: 1429,
        customer: customerId,
        createdAt: new Date('2023-11-17T07:43:33.146Z'),
        updatedAt: new Date('2023-11-17T07:43:33.146Z')
      },
      {
        ticker: tickerIdETH,
        amount: 0.88,
        category: 'buy',
        totalPrice: 3500651,
        fee: 1750,
        customer: customerId,
        createdAt: new Date('2023-11-17T07:43:33.146Z'),
        updatedAt: new Date('2023-11-17T07:43:33.146Z')
      },
      {
        ticker: tickerIdETH,
        amount: 0.22,
        category: 'sell',
        totalPrice: 2388841,
        fee: 2391,
        customer: customerId,
        createdAt: new Date('2023-11-17T07:43:33.146Z'),
        updatedAt: new Date('2023-11-17T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 1,
        category: 'sell',
        totalPrice: 3697437,
        fee: 3701,
        customer: customerId,
        createdAt: new Date('2023-11-19T07:43:33.146Z'),
        updatedAt: new Date('2023-11-19T07:43:33.146Z')
      },
      {
        ticker: tickerIdETH,
        amount: 0.1,
        category: 'buy',
        totalPrice: 3921102,
        fee: 1960,
        customer: customerId,
        createdAt: new Date('2023-11-21T07:43:33.146Z'),
        updatedAt: new Date('2023-11-21T07:43:33.146Z')
      },
      {
        ticker: tickerIdBTC,
        amount: 0.3,
        category: 'sell',
        totalPrice: 4100727,
        fee: 4105,
        customer: customerId,
        createdAt: new Date('2023-11-21T07:43:33.146Z'),
        updatedAt: new Date('2023-11-21T07:43:33.146Z')
      }
    ];

    await db.collection('transaction').insertMany(transactions);
  },

  async down(db) {
    await db.collection('ticker').drop();
    await db.collection('customer').drop();
    await db.collection('transaction').drop();
    await db.collection('price-history').drop();
    await db.collection('portfolio').drop();
  }
};
