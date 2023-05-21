const db = require("../models");
const Role = db.role;


exports.allAccess = (req, res) =>  {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) =>  {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) =>  {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) =>  {
  res.status(200).send("Moderator Content.");
};

exports.  getRoles = async (req, res) =>  {
  const roles = await Role.findAll();
  res.status(200).send(roles);
};