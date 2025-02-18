import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from '../dto/create-contact.dto';
import { MarkFavoriteDto } from '../dto/mark-favorite.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../models/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async findById(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    const updatedContact = await this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true }).exec();
    if (!updatedContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return updatedContact;
  }

  async remove(id: string): Promise<void> {
    const result = await this.contactModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
  }

  async markFavorite(id: string, markFavoriteDto: MarkFavoriteDto): Promise<Contact> {
    const contact = await this.findById(id);
    contact.favorito = markFavoriteDto.favorito;
    contact.last_updated = new Date();
    return contact.save();
  }

  async setActiveStatus(id: string, active: boolean): Promise<Contact> {
    const contact = await this.findById(id);
    contact.ativo    = active;
    contact.last_updated = new Date();
    return contact.save();
  }

  async getRecentContacts(): Promise<Contact[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this.contactModel.find({ created_at: { $gte: sevenDaysAgo } }).limit(10).exec();
  }

  async phoneExists(phone: string): Promise<boolean> {
    const contact = await this.contactModel.findOne({ celular: phone }).exec();
    return !!contact; 
  }
}
