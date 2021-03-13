import DefaultOperations from "./defaultOperations";
const axios = jest.requireActual("axios");
jest.unmock("axios");

const MockAdapter = require("axios-mock-adapter");
const mockAxios = new MockAdapter(axios);

const pageId = "12345";
const apiKey = "##key##";
const path = "my-path";
const id = "23";

test("I can import DefaultOperations", () => {
  expect(DefaultOperations).toBeDefined();
});

test("I can require DefaultOperations", () => {
  expect(require("./defaultOperations")).toBeDefined();
});

test("Default base url is set when built", () => {
  expect(new DefaultOperations(null, null, null).BASE_URL).toBe(
    "https://api.statuspage.io/v1/pages"
  );
});

test("Default constructor parameters result attributes", () => {
  const defaultOperations = new DefaultOperations("PageId", "ApiKey", "Path");
  expect(defaultOperations.pageId).toBe("PageId");
  expect(defaultOperations.path).toBe("Path");
  expect(defaultOperations.config).toStrictEqual({
    headers: {
      Authorization: "OAuth ApiKey",
    },
  });
});

test("verify GET", async () => {
  const expectedReturn = { id, name: "expecting name" };
  mockAxios
    .onGet(`https://api.statuspage.io/v1/pages/${pageId}/${path}/${id}`)
    .reply(200, expectedReturn);

  const defaultOperations = new DefaultOperations(pageId, apiKey, path);

  let returnedObject = await defaultOperations.get(id);

  expect(returnedObject).toEqual(expectedReturn);
});

test("verify LIST", async () => {
  const expectedReturn = [
    { id: 1, name: "expecting name" },
    { id: 2, name: "expecting name 2" },
  ];
  mockAxios
    .onGet(`https://api.statuspage.io/v1/pages/${pageId}/${path}`)
    .reply(200, expectedReturn);

  const defaultOperations = new DefaultOperations(pageId, apiKey, path);

  let returnedObject = await defaultOperations.list();

  expect(returnedObject).toEqual(expectedReturn);
});

test("verify CREATE", async () => {
  const expectedReturn = { id: 1, name: "expecting name" };
  mockAxios
    .onPost(`https://api.statuspage.io/v1/pages/${pageId}/${path}`, {
      name: "expecting name",
    })
    .reply(201, expectedReturn);

  const defaultOperations = new DefaultOperations(pageId, apiKey, path);

  let returnedObject = await defaultOperations.create({
    name: "expecting name",
  });

  expect(returnedObject).toEqual(expectedReturn);
});

test("verify UPDATE", async () => {
    const expectedReturn = { id: "1", name: "expecting name" };
    mockAxios
      .onPatch(`https://api.statuspage.io/v1/pages/${pageId}/${path}/1`, {
        name: "expecting name",
      })
      .reply(200, expectedReturn);
  
    const defaultOperations = new DefaultOperations(pageId, apiKey, path);
  
    let returnedObject = await defaultOperations.update("1", {
      name: "expecting name",
    });
  
    expect(returnedObject).toEqual(expectedReturn);
  });

  test("verify DELETE", async () => {
    mockAxios
      .onDelete(`https://api.statuspage.io/v1/pages/${pageId}/${path}/1`)
      .reply(204);
  
    const defaultOperations = new DefaultOperations(pageId, apiKey, path);
  
    let returnedObject = await defaultOperations.delete("1");
  
    expect(returnedObject).toBeUndefined();
  });
