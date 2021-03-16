import CRUDOperations from './crudOperations';
import StatusPage from './statuspage';

const pageId = '12345';
const apiKey = '##key##';

test('I can import StatusPage', () => {
  expect(StatusPage).toBeDefined();
});

test('I can require StatusPage', () => {
  // eslint-disable-next-line global-require
  expect(require('./statuspage')).toBeDefined();
});

test('Verify components', async () => {
  const path = 'components';
  const statusPage = new StatusPage(pageId, apiKey);
  expect(statusPage.components()).toStrictEqual(
    new CRUDOperations<Object>(pageId, apiKey, path),
  );
});

test('Verify component-groups', async () => {
  const path = 'component-groups';
  const statusPage = new StatusPage(pageId, apiKey);
  expect(statusPage.componentGroups()).toStrictEqual(
    new CRUDOperations<Object>(pageId, apiKey, path),
  );
});

test('Verify incidents', async () => {
  const path = 'incidents';
  const statusPage = new StatusPage(pageId, apiKey);
  expect(statusPage.incidents()).toStrictEqual(
    new CRUDOperations<Object>(pageId, apiKey, path),
  );
});
