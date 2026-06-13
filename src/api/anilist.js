const query = `
query {
  Page(page: 1, perPage: 10) {
    media(sort: TRENDING_DESC, type: ANIME) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
      averageScore
      genres
    }
  }
}
`;

export async function getTrendingAnime() {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  const data = await response.json();

  return data.data.Page.media;
}