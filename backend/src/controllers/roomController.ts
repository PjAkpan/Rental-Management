import { Request, Response } from 'express';

// Define a controller function to get a list of rooms
export const getRooms = (req: Request, res: Response): void => {
  res.send('List of rooms');
};

// Define a controller function to add a new room
export const addRoom = (req: Request, res: Response): void => {
  res.send('New room added');
};

// Define a controller function to update room details
export const updateRoom = (req: Request, res: Response): void => {
  res.send('Room updated');
};

// Define a controller function to delete a room
export const deleteRoom = (req: Request, res: Response): void => {
  res.send('Room deleted');
};
