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
    search(query: string, limit?: number): Promise<Array<any>>;

    /**
     * Get any playlist metadada by given id
     * @param playlist_id The playlist's unique id
     */
    getPlaylist(playlist_id: string): Promise<any>;

    /**
     * Get tracks metadada by given ids
     * @param tracks The track id list
     */
    getTracks(...tracks: string[]): Promise<any[]>;

    /**
     * Returns an array of URLs to stream from
     * @param track The track metadata object
     */
    getTrackTranscodings(track: object): Promise<Array<string>>;

}

export = SoundCloud;