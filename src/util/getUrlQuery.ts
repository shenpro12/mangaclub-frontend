const getUrlQuery = (query: {
  sort?: any;
  page?: any;
  keyword?: any;
  genre?: any;
  author?: any;
  status?: any;
  limit?: any;
}) => {
  let queryString: Array<string> = [];
  if (query.limit) {
    queryString.push(`limit=${query.limit}`);
  }
  if (query.sort) {
    queryString.push(`sort=${query.sort}`);
  }
  if (query.page) {
    queryString.push(`page=${query.page}`);
  }
  if (query.keyword) {
    queryString.push(`keyword=${query.keyword}`);
  }
  if (query.genre) {
    if (typeof query.genre === "object") {
      query.genre.map((i: string) => {
        queryString.push(`genre=${i}`);
      });
    }
    if (typeof query.genre === "string") {
      queryString.push(`genre=${query.genre}`);
    }
  }
  if (query.author) {
    queryString.push(`author=${query.author}`);
  }
  if (query.status) {
    queryString.push(`status=${query.status}`);
  }
  if (queryString.length) {
    return `?${queryString.join("&")}`;
  }
  return "";
};
export default getUrlQuery;
