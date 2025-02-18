import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../models/contact.schema';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;
  let model: Model<Contact>;

  // Mock de um contato único
  const mockContact = {
    _id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '1234567890',
    phone: '0987654321',
    active: true,
    favorite: false,
    created_at: new Date(),
    last_updated: new Date(),
  };

  // Mock de uma lista de contatos
  const mockContacts = [
    { ...mockContact, _id: '1', name: 'John Doe' },
    { ...mockContact, _id: '2', name: 'Jane Smith' },
    { ...mockContact, _id: '3', name: 'Bob Johnson' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getModelToken(Contact.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockContact),
            constructor: jest.fn().mockResolvedValue(mockContact),
            findById: jest.fn().mockResolvedValue(mockContact),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockContact),
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
            find: jest.fn().mockResolvedValue(mockContacts),
            create: jest.fn().mockResolvedValue(mockContact),
          },
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    model = module.get<Model<Contact>>(getModelToken(Contact.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', async () => {
    const createDto: CreateContactDto = {
      nome: 'John Doe',
      email: 'john.doe@example.com',
      celular: '1234567890',
      telefone: '0987654321',
      ativo: true,
      favorito: false,
    };

    const result = await service.create(createDto);
    expect(result).toBeTruthy();
    expect(model.create).toHaveBeenCalledWith(createDto);
  });

  it('should return all contacts', async () => {
    const contacts = await service.findAll();
    expect(contacts).toEqual(mockContacts);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return a contact by ID', async () => {
    const contact = await service.findById('1');
    expect(contact).toEqual(mockContact);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if contact not found during update', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
    try {
      await service.update('non-existent-id', {});
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should mark a contact as favorite', async () => {
    const markFavoriteDto = { favorito: true };
    const result = await service.markFavorite('1', markFavoriteDto);
    expect(result.favorito).toBe(true);
    expect(model.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should set contact active status', async () => {
    const result = await service.setActiveStatus('1', false);
    expect(result.ativo).toBe(false);
    expect(model.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should return recent contacts', async () => {
    const result = await service.getRecentContacts();
    expect(result).toEqual(mockContacts);
    expect(model.find).toHaveBeenCalled();
  });
});
