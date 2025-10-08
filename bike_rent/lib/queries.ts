// SELECT with WHERE (exact match)
export const getBikeByStatus = `
  SELECT * FROM Bike WHERE CurrentStatus = ?;
`;

export const getBikeByLocation = `
  SELECT * FROM Bike WHERE LocationID = ?;
`;

// SELECT with LIKE (search bar)
export const getBikeBySearch = `
  SELECT * FROM Bike WHERE Model LIKE ?;
`;

// SELECT all bikes with JOIN (includes location name)
export const getAllBikes = `
  SELECT b.*, l.LocationName AS location_name
  FROM Bike b
  JOIN Location l ON b.LocationID = l.LocationID;
`;

// SELECT with multiple filters (status + search)
export const getBikeByStatusAndSearch = `
  SELECT b.*, l.LocationName AS location_name
  FROM Bike b
  JOIN Location l ON b.LocationID = l.LocationID
  WHERE b.CurrentStatus = ? AND b.Model LIKE ?;
`;
  