const axios = require('axios').default;
const api_url = 'https://api-v2.soundcloud.com';

module.exports = class SoundCloud {

    constructor(client_id) {
        this.client_id = client_id;
    }

    async search(query, limit = 3) {
        const res = await axios.get('/search/tracks', {
            baseURL: api_url,
            params: {
                q: query,
                client_id: this.client_id,
                limit: String(limit)
            }
        });
        return [...res.data['collection']];
    }

    async getTrack(track_id) {
        const res = await axios.get(`/tracks/${track_id}`, {
            baseURL: api_url,
            params: { client_id: this.client_id }
        });
        return res.data;
    }

    async getTrackTranscodings(track) {
        const transcodings = [...track['media'].transcodings];
        if (transcodings.some(e => e.format.protocol == 'progressive')) {
            const progressive = transcodings.find(e => e.format.protocol == 'progressive');
            const res = await axios.get(progressive['url'], {
                baseURL: api_url,
                params: { client_id: this.client_id }
            });

            return [res.data['url']];
        } else if (transcodings.some(e => e.format.protocol == 'hls' && e.format.mime_type == 'audio/mpeg')) {
            const chunks = [];
            const regex = /(^(?!#).+)/gm;

            const hls = transcodings.find(e => e.format.protocol == 'hls' && e.format.mime_type == 'audio/mpeg');
            const res = await axios.get(hls['url'], {
                baseURL: api_url,
                params: { client_id: this.client_id }
            });

            const m3u = await request.get({ url: res.data['url'] });
            for (let match; (match = regex.exec(m3u));) chunks.push(match[0]);
            return chunks;
        }

        return [];
    }

}