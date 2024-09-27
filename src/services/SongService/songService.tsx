const API_BASE_URL = 'http://localhost:8080';

// Fetching Top5 Songs
export const fetchTop5Songs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/top5/likes`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data= await response.json();
      return data
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  }

//Fetching Songs By using Specific Artist
export const fetchSongsByArtist = async (artistName: string) => {

    try {
        const response = await fetch(`${API_BASE_URL}/songs/artist/${encodeURIComponent(artistName)}`, {

            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const data2 = await response.json();
        console.log(data2)
        return data2;
    } catch (error: unknown) { // Specify the type of error explicitly
        if (error instanceof Error) {
            throw new Error('Error fetching songs by artist: ' + error.message);
        } else {
            throw new Error('Unknown error fetching songs by artist');
        }
    }
};

//Fetching All The Songs 
export const AllSongs = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}/songs?pageNumber=0&pageSize=199`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // return the actual songs data, not response


    } catch (error) {
        console.error('Failed to fetch songs', error);
    }
};

//Fetching Songs By using Specific Genre
export const fetchSongsByGenre = async (genreName: string) => {

    try {
        const response = await fetch(`${API_BASE_URL}/songs/genre/${encodeURIComponent(genreName)}`, {

            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const data = await response.json();
        return data;
    } catch (error: unknown) { // Specify the type of error explicitly
        if (error instanceof Error) {
            throw new Error('Error fetching songs by artist: ' + error.message);
        } else {
            throw new Error('Unknown error fetching songs by artist');
        }
    }
};