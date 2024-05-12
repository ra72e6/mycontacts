const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//Get all contacts
//Get /contacts

const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render('./index.ejs', { contacts: contacts });
});
//View and Contact form
//GEt /contacts/add
const addContactForm = (req, res) => {
  res.render('./add.ejs');
};

//create contact
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.send('Create Contacts');
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  // 연락처 상세 보기`
  const contact = await Contact.findById(req.params.id);
  res.render('./update.ejs', { contact: contact });
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error('Contact not found');
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  contact.save();

  res.redirect('/contacts');
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  await Contact.findByIdAndDelete(id);
  res.redirect('/contacts');
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
};
