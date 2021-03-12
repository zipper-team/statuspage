import DefaultOperations from './defaultOperations';

const StatusPage = class StatusPage {

    pageId: String;
    apiKey: String;
    config: Object;
    
    constructor(pageId: String, apiKey: String) {
        this.pageId = pageId;
        this.apiKey = apiKey;
    }

    incidents() : DefaultOperations<Object> {
        return new DefaultOperations<Object>(this.pageId, this.apiKey, "incidents");
    }

    components() : DefaultOperations<Object> {
        return new DefaultOperations<Object>(this.pageId, this.apiKey, "components");
    }

    componentGroups() : DefaultOperations<Object> {
        return new DefaultOperations<Object>(this.pageId, this.apiKey, "component-groups");
    }
};
export default StatusPage;
Object.assign(module.exports, StatusPage);