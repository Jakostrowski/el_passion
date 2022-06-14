export const getTotalPages = (header: string | undefined) => {
  if (header) {
    const lastPageLink = header.substring(
      header.indexOf('<', 1) + 1,
      header.lastIndexOf('>'),
    );
    const totalPages = Number(lastPageLink.split('&page=')[1]);
    return totalPages;
  }
};
