import axios from 'axios';
class DefaultOperations<T> {
    public BASE_URL: String = 'https://api.statuspage.io/v1/pages';
    private path: String;
    private pageId: String;
    private config: Object;

    constructor(pageId: String, apiKey: String, path: String) {
        this.path = path;
        this.pageId = pageId;
        this.config = {
            headers: {
                'Authorization' :  `OAuth ${apiKey}`
            }
        }
    }

    async get(id: String): Promise<T> {
        let res = await axios.get(`${this.BASE_URL}/${this.pageId}/${this.path}/${id}`, this.config);
        return res.data;
    }

    async list(): Promise<Array<T>>{
        let res = await axios.get(`${this.BASE_URL}/${this.pageId}/${this.path}`, this.config);
        return res.data;
    }

    async create(data : T): Promise<T> {
        let res = await axios.post(`${this.BASE_URL}/${this.pageId}/${this.path}`, data, this.config);
        return res.data;
    }

    async update(id: String, data: T): Promise<T> {
        let res = await axios.patch(`${this.BASE_URL}/${this.pageId}/${this.path}/${id}`, data, this.config);
        return res.data;
    }

    async delete(id): Promise<boolean> {
        let res = await axios.delete(`${this.BASE_URL}/${this.pageId}/${this.path}/${id}`, this.config);
        return res.data;
    }
}

export default DefaultOperations;
Object.assign(module.exports, DefaultOperations);