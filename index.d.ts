declare class SoundCloud {

    client_id: string;

    /**
     * Creates a new instance of the SoundCloud API wrapper
     * @param client_id Your SoundCloud API key
     */
    constructor(client_id: string);

    /**
     * Searches for tracks
     * @param query The query to search for
     * @param limit The limit value for the returned results
     */
    async search(query: string, limit?: number): Array<object>;

    /**
     * Get any track metadada by given id
     * @param track_id The track's unique id
     */
    async getTrack(track_id: string): object;

    /**
     * Returns an array of URLs to stream from
     * @param track The track metadata object
     */
    async getTrackTranscodings(track: object): Array<string>;

}

export = SoundCloud;