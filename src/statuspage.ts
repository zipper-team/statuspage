// eslint-disable-next-line import/no-unresolved, import/extensions
import CRUDOperations from './crudOperations';

const StatusPage = class StatusPage {
  pageId: String;

  apiKey: String;

  config: Object;

  constructor(pageId: String, apiKey: String) {
    this.pageId = pageId;
    this.apiKey = apiKey;
  }

  incidents(): CRUDOperations<Object> {
    return new CRUDOperations<Object>(this.pageId, this.apiKey, 'incidents');
  }

  components(): CRUDOperations<Object> {
    return new CRUDOperations<Object>(
      this.pageId,
      this.apiKey,
      'components',
    );
  }

  componentGroups(): CRUDOperations<Object> {
    return new CRUDOperations<Object>(
      this.pageId,
      this.apiKey,
      'component-groups',
    );
  }
};
export default StatusPage;
Object.assign(module.exports, StatusPage);
