"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.addRoom = exports.getRooms = void 0;
// Define a controller function to get a list of rooms
const getRooms = (req, res) => {
    res.send('List of rooms');
};
exports.getRooms = getRooms;
// Define a controller function to add a new room
const addRoom = (req, res) => {
    res.send('New room added');
};
exports.addRoom = addRoom;
// Define a controller function to update room details
const updateRoom = (req, res) => {
    res.send('Room updated');
};
exports.updateRoom = updateRoom;
// Define a controller function to delete a room
const deleteRoom = (req, res) => {
    res.send('Room deleted');
};
exports.deleteRoom = deleteRoom;
