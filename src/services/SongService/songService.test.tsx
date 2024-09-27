import { fetchSongsByArtist ,AllSongs ,fetchSongsByGenre} from "./songService"; // Replace with your actual file path

describe('fetchSongsByArtist function', () => {
  it('fetches songs by artist successfully', async () => {
    const artistName = 'SomeArtist';
    const expectedUrl = `http://localhost:8080/songs/artist/${encodeURIComponent(artistName)}`;

    // Mocking fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ songs: ['Song1', 'Song2'] }),
    });

    const songs = await fetchSongsByArtist(artistName);

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    expect(songs).toEqual({ songs: ['Song1', 'Song2'] });
  });

  it('throws an error when fetch fails', async () => {
    const artistName = 'NonExistentArtist';

    // Mocking fetch function to simulate failure
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    await expect(fetchSongsByArtist(artistName)).rejects.toThrow(
      'Error fetching songs by artist'
    );
  });
});

describe('AllSongs function', () => {
  it('fetches all songs successfully', async () => {
    const expectedUrl = 'http://localhost:8080/songs?pageNumber=0&pageSize=120';

    // Mocking fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ songs: ['Song1', 'Song2'] }),
    });

    const songs = await AllSongs();

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    expect(songs).toEqual({ songs: ['Song1', 'Song2'] });
  });

  it('throws an error when HTTP request fails', async () => {
        // Mocking fetch function to simulate failure
        global.fetch = jest.fn().mockImplementation(() => {
          throw new Error('Failed to fetch');
        });
    
      });
});


describe('fetchSongsByGenre function', () => {
  it('fetches songs by genre successfully', async () => {
    const genreName = 'Rock';
    const expectedUrl = `http://localhost:8080/songs/genre/${encodeURIComponent(genreName)}`;

    // Mocking fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ songs: ['Song1', 'Song2'] }),
    });

    const songs = await fetchSongsByGenre(genreName);

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    expect(songs).toEqual({ songs: ['Song1', 'Song2'] });
  });

  it('throws an error when fetch fails', async () => {
    const genreName = 'NonExistentGenre';

    // Mocking fetch function to simulate failure
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    await expect(fetchSongsByGenre(genreName)).rejects.toThrow(
      'Error fetching songs by artist'
    );
  });
});


