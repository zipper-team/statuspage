import DefaultOperations from './defaultOperations';
import StatusPage from './statuspage';

const pageId = "12345";
const apiKey = "##key##";

test('I can import StatusPage', () => {
    expect(StatusPage).toBeDefined();
});

test('I can require StatusPage', () => {
    expect(require('./statuspage')).toBeDefined();
});

test("verify components", async () => {
  const path = "components";
  const statusPage = new StatusPage(pageId, apiKey);
  expect(statusPage.components()).toStrictEqual(new DefaultOperations<Object>(pageId, apiKey, path));
});

test("verify component-groups", async () => {
    const path = "component-groups";
    const statusPage = new StatusPage(pageId, apiKey);
    expect(statusPage.componentGroups()).toStrictEqual(new DefaultOperations<Object>(pageId, apiKey, path));
  });

  test("verify incidents", async () => {
    const path = "incidents";
    const statusPage = new StatusPage(pageId, apiKey);
    expect(statusPage.incidents()).toStrictEqual(new DefaultOperations<Object>(pageId, apiKey, path));
  });

