import CRUDOperations from './crudOperations';

const axios = jest.requireActual('axios');
jest.unmock('axios');

// eslint-disable-next-line import/no-extraneous-dependencies
const MockAdapter = require('axios-mock-adapter');

const mockAxios = new MockAdapter(axios);

const pageId = '12345';
const apiKey = '##key##';
const path = 'my-path';
const id = '23';

test('I can import CRUDOperations', () => {
  expect(CRUDOperations).toBeDefined();
});

test('I can require CRUDOperations', () => {
  // eslint-disable-next-line global-require
  expect(require('./crudOperations')).toBeDefined();
});

test('Default base url is set when built', () => {
  expect(new CRUDOperations(null, null, null).BASE_URL).toBe(
    'https://api.statuspage.io/v1/pages',
  );
});

test('Default constructor parameters result attributes', () => {
  const crudOperations = new CRUDOperations('PageId', 'ApiKey', 'Path');
  expect(crudOperations.pageId).toBe('PageId');
  expect(crudOperations.path).toBe('Path');
  expect(crudOperations.config).toStrictEqual({
    headers: {
      Authorization: 'OAuth ApiKey',
    },
  });
});

test('Verify get operation', async () => {
  const expectedReturn = { id, name: 'expecting name' };
  mockAxios
    .onGet(`https://api.statuspage.io/v1/pages/${pageId}/${path}/${id}`)
    .reply(200, expectedReturn);

  const crudOperations = new CRUDOperations(pageId, apiKey, path);

  const returnedObject = await crudOperations.get(id);

  expect(returnedObject).toEqual(expectedReturn);
});

test('Verify list operation', async () => {
  const expectedReturn = [
    { id: 1, name: 'expecting name' },
    { id: 2, name: 'expecting name 2' },
  ];
  mockAxios
    .onGet(`https://api.statuspage.io/v1/pages/${pageId}/${path}`)
    .reply(200, expectedReturn);

  const crudOperations = new CRUDOperations(pageId, apiKey, path);

  const returnedObject = await crudOperations.list();

  expect(returnedObject).toEqual(expectedReturn);
});

test('Verify create operation', async () => {
  const expectedReturn = { id: 1, name: 'expecting name' };
  mockAxios
    .onPost(`https://api.statuspage.io/v1/pages/${pageId}/${path}`, {
      name: 'expecting name',
    })
    .reply(201, expectedReturn);

  const crudOperations = new CRUDOperations(pageId, apiKey, path);

  const returnedObject = await crudOperations.create({
    name: 'expecting name',
  });

  expect(returnedObject).toEqual(expectedReturn);
});

test('Verify update operation', async () => {
  const expectedReturn = { id: '1', name: 'expecting name' };
  mockAxios
    .onPatch(`https://api.statuspage.io/v1/pages/${pageId}/${path}/1`, {
      name: 'expecting name',
    })
    .reply(200, expectedReturn);

  const crudOperations = new CRUDOperations(pageId, apiKey, path);

  const returnedObject = await crudOperations.update('1', {
    name: 'expecting name',
  });

  expect(returnedObject).toEqual(expectedReturn);
});

test('Verify delete operation', async () => {
  mockAxios
    .onDelete(`https://api.statuspage.io/v1/pages/${pageId}/${path}/1`)
    .reply(204);

  const crudOperations = new CRUDOperations(pageId, apiKey, path);

  const returnedObject = await crudOperations.delete('1');

  expect(returnedObject).toBeUndefined();
});
