declare class SoundCloud {

    client_id: string;

    constructor(client_id: string);

    async search(query: string, limit?: number): Array;

    async getTrack(track_id: string): object;

    async getTrackTranscodings(track: object): Array<string>;

}

export = SoundCloud;